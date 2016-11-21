// @flow
import React, {Component, PropTypes} from 'react';
import SMIcon from '../../home/components/SMIcon';
import {View} from './View';
import Logo from '../../home/components/Logo';
import Disclaimer from '../../home/components/Disclaimer';
import {Map, TileLayer, ZoomControl} from 'react-leaflet';
import Control from 'react-leaflet-control';
import {mobileBreakpoint} from '../../common/constants';
import {languages} from '../../language/constants';
import {MAP_URL} from '../../map/constants';
import {latLngToArray} from '../../map/helpers';
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
      modalOpen: false
    };

    this.locateUser = this.locateUser.bind(this);
    this.updateIsMobile = this.updateIsMobile.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.toggleMenu = this.toggleMenu.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateIsMobile);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateIsMobile);
    //this.refs.map.leafletElement.setActiveArea('activeArea');
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.params.unitId && nextProps.units && this.state.isMobile) {
      const unit = nextProps.units.filter((unit) => unit.id == nextProps.params.unitId)[0];
      if (unit) {
        //For some reason could not use reverse here so had to do this weird way.
        this.refs.map.leafletElement.flyTo([unit.location.coordinates[1]+0.04, unit.location.coordinates[0]], 12);
      }
    }
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
      console.log(this.state.modalOpen);
    } else {
      this.setState({modalOpen: true});
      console.log(this.state.modalOpen);
    }
  }

  openModal() {
    this.setState({modalOpen: true});
    console.log(this.state.modalOpen);
  }

  closeModal() {
    this.setState({modalOpen: false});
    console.log(this.state.modalOpen);
  }

  render() {
    const {position, selectedUnitId, units, selected, activeLanguage, openUnit, changeLanguage, t} = this.props;
    const {isMobile, menuOpen} = this.state;

    return (
      <View id="map-view" className="map-view" isSelected={selected}>
        <Map ref="map"
          zoomControl={false}
          attributionControl={false}
          center={position}
          zoom={12}
          onClick={this.handleClick} >
          <TileLayer
        url={MAP_URL}
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          <UserLocationMarker />
          <UnitsOnMap units={units} selectedUnitId={selectedUnitId} openUnit={openUnit}/>
          {!isMobile && <ZoomControl position="bottomright" />}
          <Control className="leaflet-bar leaflet-control-locate" position="bottomright">
            <a className="custom-control-button" onClick={this.locateUser}>
              <SMIcon icon="address" />
            </a>
          </Control>
          <LanguageChanger activeLanguage={activeLanguage} changeLanguage={changeLanguage} />
          {menuOpen ? <InfoMenu t={t} openModal={this.openModal} /> : null}
          <Control className="leaflet-bar leaflet-control-info" position={isMobile ? 'bottomleft' : 'topright'}>
            <a className="custom-control-button" onClick={() => this.toggleMenu()}>
              <SMIcon icon="info" />
            </a>
          </Control>
        </Map>
        <Logo/>
        <Disclaimer attributionLink="http://osm.org/copyright" />
        {this.state.modalOpen ? <AboutModal closeModal={this.closeModal} t={t}/> : null}
      </View>
    );
  }
}

export default translate()(MapView);

const LanguageChanger = ({changeLanguage, activeLanguage}) =>
  <div className="language-changer">
    {Object.keys(languages).filter((language) => languages[language] !== activeLanguage).map((languageKey, index) => (
      <div key={index} style={{ display: 'flex' }}>
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
  </div>;

const InfoMenuItem = ({children, handleClick, icon}) =>
  <div className="info-menu-item" onClick={() => handleClick()}>
    {icon ? <SMIcon icon={icon} style={{paddingRight: 2}}/> : null}
    {children}
  </div>;

const AboutModal = ({closeModal, t}) =>
  <div className="about-modal-backdrop">
    <div className="about-modal-wrapper">
      <div className="about-modal-box">
        <div className="about-modal-controls">
          <SMIcon icon="close" onClick={() => closeModal()} />
        </div>
        <div className="about-modal-content">
          {t('MAP.ABOUT')}
        </div>
      </div>
    </div>
  </div>;
