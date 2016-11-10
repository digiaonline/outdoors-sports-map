// @flow
import React, {Component, PropTypes} from 'react';
import {Glyphicon} from 'react-bootstrap';
import {View} from './View';
import Logo from '../../home/components/Logo';
import Disclaimer from '../../home/components/Disclaimer';
import {Map, TileLayer, ZoomControl} from 'react-leaflet';
import Control from 'react-leaflet-control';
import {getUnitPosition} from '../helpers';
import {mobileBreakpoint} from '../../common/constants';
import {MAP_URL} from '../../map/constants';
import {latLngToArray} from '../../map/helpers';
import UnitMarker from './UnitMarker';
import UserLocationMarker from '../../map/components/UserLocationMarker';

export class MapView extends Component {
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
      isMobile: window.innerWidth < mobileBreakpoint
    };

    this.locateUser = this.locateUser.bind(this);
    this.updateIsMobile = this.updateIsMobile.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateIsMobile);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateIsMobile);
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

  render() {
    const {position, units, selected, handleClick: openUnit} = this.props;
    const {isMobile} = this.state;

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
          {
            units && units.map(
              (unit, index) => //{console.log(unit); return <p key={index}>getAttr(unit.name)</p>;}
                <UnitMarker unit={unit} position={getUnitPosition(unit)} id={unit.id} key={index} handleClick={openUnit} />
            )
          }
          {!isMobile && <ZoomControl position="bottomright" />}
          <Control className="leaflet-bar leaflet-control-locate" position="bottomright">
            <a onClick={this.locateUser}>
              <Glyphicon glyph="screenshot"/>
            </a>
          </Control>
          <Control className="leaflet-bar leaflet-control-info" position={isMobile ? 'bottomleft' : 'topright'}>
            <a>
              <Glyphicon glyph="info-sign"/>
            </a>
          </Control>
        </Map>
        <Logo/>
        <Disclaimer attributionLink="http://osm.org/copyright" />
      </View>
    );
  }
}
