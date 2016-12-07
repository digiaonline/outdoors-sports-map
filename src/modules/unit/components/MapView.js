// @flow
import React, {Component, PropTypes} from 'react';
import isEmpty from 'lodash/isEmpty';
import SMIcon from '../../home/components/SMIcon';
import OSMIcon from '../../home/components/OSMIcon';
import FeedbackModal from './FeedbackModal';
import {View} from './View';
import Logo from '../../home/components/Logo';
import {Map, TileLayer, ZoomControl} from 'react-leaflet';
import Control from '../../map/components/Control';
import {mobileBreakpoint} from '../../common/constants';
import {SUPPORTED_LANGUAGES} from '../../language/constants';
import {MAP_URL, DEFAULT_ZOOM, MIN_ZOOM, BOUNDARIES} from '../../map/constants';
import {latLngToArray} from '../../map/helpers';
import {getUnitPosition} from '../helpers';
import UnitsOnMap from './UnitsOnMap';
import UserLocationMarker from '../../map/components/UserLocationMarker';
import {translate} from 'react-i18next';

class MapView extends Component {
  static propTypes = {
    position: PropTypes.array.isRequired,
    units: PropTypes.array
  };

  state: {
    isMobile: boolean,
    zoomLevel: number,
    menuOpen: boolean
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      isMobile: window.innerWidth < mobileBreakpoint,
      menuOpen: false,
      aboutModalOpen: false,
      feedbackModalOpen: false,
      zoomLevel: DEFAULT_ZOOM
    };

    this.setLocation = this.setLocation.bind(this);
    this.locateUser = this.locateUser.bind(this);
    this.updateIsMobile = this.updateIsMobile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.openAboutModal = this.openAboutModal.bind(this);
    this.closeAboutModal = this.closeAboutModal.bind(this);
    this.openFeedbackModal = this.openFeedbackModal.bind(this);
    this.closeFeedbackModal = this.closeFeedbackModal.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateIsMobile);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateIsMobile);
  }

  componentWillReceiveProps(nextProps) {
    const {selectedUnit} = this.props;
    if (nextProps.selectedUnit &&
      (!selectedUnit || selectedUnit.id !== nextProps.selectedUnit.id ) ) {
      this.centerMapToUnit(nextProps.selectedUnit);
    }
  }

  centerMapToUnit(unit: Object) {
    if (this.state.isMobile) {
      let location = getUnitPosition(unit);
      location[0] = location[0] + 0.02;
      //For some reason could not use reverse here so had to do this weird way.
      this.refs.map.leafletElement.setView(location, DEFAULT_ZOOM);
    }
    else {
      let location = getUnitPosition(unit);
      location[1] = location[1] - 0.04;

      this.refs.map.leafletElement.setView(location, DEFAULT_ZOOM);
    }
  }

  handleZoom() {
    this.setState({zoomLevel: this.refs.map.leafletElement.getZoom()});
  }

  updateIsMobile() {
    this.setState({isMobile: window.innerWidth < mobileBreakpoint});
  }

  locateUser() {
    this.refs.map.leafletElement.locate({setView: true});
  }

  handleClick(event: Object) {
    // Click events from info menu and language changer hit this. Don't
    // do anything for those events.
    if(event.originalEvent.target.className.includes('leaflet')) {
      this.setLocation(event);
    }
  }

  setLocation(event: Object) {
    this.props.setLocation(latLngToArray(event.latlng));
  }

  toggleMenu() {
    if(this.state.menuOpen) {
      this.setState({menuOpen: false});
    } else {
      this.setState({menuOpen: true});
    }
  }

  setView(coordinates) {
    this.refs.map.leafletElement.setView(coordinates);
  }

  openAboutModal() {
    this.setState({aboutModalOpen: true});
  }

  closeAboutModal() {
    this.setState({aboutModalOpen: false});
  }

  openFeedbackModal() {
    this.setState({feedbackModalOpen: true});
  }

  closeFeedbackModal() {
    this.setState({feedbackModalOpen: false});
  }

  render() {
    const {position, selectedUnit, units, selected, activeLanguage, openUnit, changeLanguage, t} = this.props;
    const {isMobile, zoomLevel, menuOpen} = this.state;

    return (
      <View id="map-view" className="map-view" isSelected={selected}>
        <Map ref="map"
          zoomControl={false}
          attributionControl={false}
          center={position}
          maxBounds={BOUNDARIES}
          zoom={DEFAULT_ZOOM}
          minZoom={MIN_ZOOM}
          onClick={this.handleClick}
          onLocationfound={this.setLocation}
          onZoomend={this.handleZoom}>
          <TileLayer
            url={MAP_URL}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <UserLocationMarker />
          <UnitsOnMap units={units} zoomLevel={zoomLevel} selectedUnit={selectedUnit} openUnit={openUnit}/>
          {!isMobile && <ZoomControl position="bottomright" />}
          <Control handleClick={this.locateUser} className="leaflet-control-locate" position="bottomright">
            <OSMIcon icon="locate" />
          </Control>
          {Object.keys(SUPPORTED_LANGUAGES).length > 1 && <LanguageChanger activeLanguage={activeLanguage} changeLanguage={changeLanguage} />}
          {menuOpen ? <InfoMenu t={t} openAboutModal={this.openAboutModal} openFeedbackModal={this.openFeedbackModal} /> : null}
          <Control handleClick={this.toggleMenu} className="leaflet-control-info" position={isMobile ? 'bottomleft' : 'topright'}>
            <SMIcon icon="info" />
          </Control>
        </Map>
        <Logo/>
        {this.state.aboutModalOpen ? <AboutModal closeModal={this.closeAboutModal} t={t}/> : null}
        {this.state.feedbackModalOpen ? <FeedbackModal handleSubmit={this.handleFeedbackSubmit} closeModal={this.closeFeedbackModal} /> : null}
      </View>
    );
  }
}

export default translate(null, {withRef: true})(MapView);

const LanguageChanger = ({changeLanguage, activeLanguage}) =>
  <div className="language-changer">
    {Object.keys(SUPPORTED_LANGUAGES).filter((language) => SUPPORTED_LANGUAGES[language] !== activeLanguage).map((languageKey, index) => (
      <div key={languageKey} style={{ display: 'flex' }}>
        <a onClick={() => changeLanguage(SUPPORTED_LANGUAGES[languageKey])}>
          {languageKey}
        </a>
        {index < Object.keys(SUPPORTED_LANGUAGES).length - 2
          ? <div style={{ marginLeft: 2, marginRight: 2 }}>|</div>
          : null}
      </div>)
    )}
  </div>;

const InfoMenu = ({openAboutModal, openFeedbackModal, t}) =>
  <div className="info-menu">
    <InfoMenuItem icon='info' handleClick={openFeedbackModal} t={t}>
      {t('MAP.INFO_MENU.GIVE_FEEDBACK')}
    </InfoMenuItem>
    <InfoMenuItem icon='info' handleClick={openAboutModal}>
      {t('MAP.INFO_MENU.ABOUT_SERVICE')}
    </InfoMenuItem>
    <InfoMenuItem handleClick={() => null}>
      <a target="_blank" href='http://osm.org/copyright' style={{padding: 1}}>&copy; {t('MAP.ATTRIBUTION')} </a>
    </InfoMenuItem>
  </div>;

const InfoMenuItem = ({children, handleClick, icon}) =>
  <div className="info-menu-item" onClick={handleClick}>
    {icon ? <SMIcon icon={icon} style={{paddingRight: 2}}/> : null}
    {children}
  </div>;

const AboutModal = ({closeModal, t}) =>
  <div className="about-modal-backdrop">
    <div className="about-modal-box">
      <div className="about-modal-controls">
        <SMIcon icon="close" onClick={() => closeModal()} />
      </div>
      <div className="about-modal-content">
        {t('MAP.ABOUT')}
      </div>
    </div>
  </div>;

// const FeedbackModal = ({closeModal, handleSubmit, t}) => {
//   let wantAnswer = null;
//   let feedback = null;
//   let email = null;
//
//   return (
//     <div className="about-modal-backdrop">
//       <div className="about-modal-box">
//         <div className="about-modal-controls">
//           <SMIcon icon="close" onClick={() => closeModal()} />
//         </div>
//         <div className="about-modal-content">
//           <h3>{t('MAP.INFO_MENU.GIVE_FEEDBACK')}</h3>
//           <form onSubmit={(e) => handleSubmit(e, feedback.value, wantAnswer.value)}>
//             <div><textarea type="text" placeholder="Message" ref={(textarea) => feedback = textarea} /></div>
//             <div>
//               <label>
//                 <input type="checkbox" value={true} ref={(checbox) => wantAnswer = checbox} />
//                 Haluan palautetta sähköpostiin
//               </label>
//             </div>
//             {wantAnswer && <div><input type="text" ref={(input) => email = input}/></div>}
//             <button type="submit">Send</button>
//           </form>
//         </div>
//       </div>
//     </div>);
// };
