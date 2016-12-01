// @flow
import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import isEmpty from 'lodash/isEmpty';
import SMIcon from '../../home/components/SMIcon';
import OSMIcon from '../../home/components/OSMIcon';
import {View} from './View';
import Logo from '../../home/components/Logo';
import Disclaimer from '../../home/components/Disclaimer';
import {Map, TileLayer, ZoomControl} from 'react-leaflet';
import Control from '../../map/components/Control';
//import Control from 'react-leaflet-control';
import {mobileBreakpoint} from '../../common/constants';
import {languages} from '../../language/constants';
import {MAP_URL, DEFAULT_ZOOM, MIN_ZOOM, BOUNDARIES} from '../../map/constants';
import {latLngToArray} from '../../map/helpers';
import {getUnitPosition} from '../helpers';
import UnitsOnMap from './UnitsOnMap';
import UserLocationMarker from '../../map/components/UserLocationMarker';
import {Modal} from 'react-bootstrap';
import {translate} from 'react-i18next';

class MapView extends Component {
  static propTypes = {
    position: PropTypes.array.isRequired,
    units: PropTypes.array
  };

  state: {
    isMobile: boolean
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      isMobile: window.innerWidth < mobileBreakpoint,
      menuOpen: false,
      modalOpen: false,
      zoomLevel: DEFAULT_ZOOM
    };

    this.locateUser = this.locateUser.bind(this);
    this.updateIsMobile = this.updateIsMobile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.handleZoom = this.handleZoom.bind(this);
    this.setView = this.setView.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateIsMobile);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateIsMobile);
    //this.refs.map.leafletElement.setActiveArea('activeArea');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.unitId && !isEmpty(nextProps.units)) {
      const unit = nextProps.units.filter((unit) => unit.id == nextProps.params.unitId)[0];
      !isEmpty(unit) && this.centerMapToUnit(unit);
    }

    /*if (nextProps.position[0] !== this.props.position[0] || nextProps.position[1] !== this.props.position[1]) {
      console.log('here');
      this.refs.map.leafletElement.setView([60,25]);
    }*/
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
    this.props.setLocation(latLngToArray(event.latlng));
  }

  toggleMenu() {
    if(this.state.menuOpen) {
      this.setState({menuOpen: false});
    } else {
      this.setState({menuOpen: true});
    }
  }

  toggleModal() {
    if(this.state.modalOpen) {
      this.setState({modalOpen: false});
    } else {
      this.setState({modalOpen: true});
    }
  }

  setView(coordinates) {
    this.refs.map.leafletElement.setView(coordinates);
  }

  openModal() {
    this.setState({modalOpen: true});
  }

  closeModal() {
    this.setState({modalOpen: false});
  }

  render() {
    const {position, selectedUnitId, units, selected, activeLanguage, openUnit, changeLanguage, t} = this.props;
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
          onLocationfound={this.handleClick}
          onZoomend={this.handleZoom}>
          <TileLayer
            url={MAP_URL}
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <UserLocationMarker />
          <UnitsOnMap units={units} zoomLevel={zoomLevel} selectedUnitId={selectedUnitId} openUnit={openUnit}/>
          {!isMobile && <ZoomControl position="bottomright" />}
          <Control handleClick={this.locateUser} className="leaflet-control-locate" position="bottomright">
            <OSMIcon icon="locate" />
          </Control>
          <LanguageChanger activeLanguage={activeLanguage} changeLanguage={changeLanguage} />
          {menuOpen ? <InfoMenu t={t} openModal={this.openModal} /> : null}
          <Control handleClick={this.toggleMenu} className="leaflet-control-info" position={isMobile ? 'bottomleft' : 'topright'}>
            <SMIcon icon="info" />
          </Control>
        </Map>
        <Logo/>
        {this.state.modalOpen ? <AboutModal closeModal={this.closeModal} t={t}/> : null}
      </View>
    );
  }
}

export default translate(null, {withRef: true})(MapView);

const LanguageChanger = ({changeLanguage, activeLanguage}) =>
  <div className="language-changer">
    {Object.keys(languages).filter((language) => languages[language] !== activeLanguage).map((languageKey, index) => (
      <div key={languageKey} style={{ display: 'flex' }}>
        <a onClick={() => changeLanguage(languages[languageKey])}>
          {languageKey}
        </a>
        {index < Object.keys(languages).length - 2
          ? <div style={{ marginLeft: 2, marginRight: 2 }}>|</div>
          : null}
      </div>)
    )}
  </div>;

const InfoMenu = ({openModal, t}) =>
  <div className="info-menu">
    <InfoMenuItem icon='info' t={t}>
      {t('MAP.INFO_MENU.GIVE_FEEDBACK')}
    </InfoMenuItem>
    <InfoMenuItem icon='info' handleClick={openModal}>
      {t('MAP.INFO_MENU.ABOUT_SERVICE')}
    </InfoMenuItem>
    <InfoMenuItem handleClick={() => null}>
      <a target="_blank" href='http://osm.org/copyright' style={{padding: 1}}>&copy; {t('MAP.ATTRIBUTION')} </a>
    </InfoMenuItem>
  </div>;

const InfoMenuItem = ({children, handleClick, icon}) =>
  <div className="info-menu-item" onClick={() => handleClick()}>
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
