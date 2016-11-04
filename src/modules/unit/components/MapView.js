// @flow
import React, {Component, PropTypes} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import {View} from './View';
import {Map, TileLayer, ZoomControl} from 'react-leaflet';
import Control from 'react-leaflet-control';
import {getUnitPosition} from '../helpers';
import {mobileBreakpoint} from '../../common/constants';
import UnitMarker from './UnitMarker';

export class MapView extends Component {
  static propTypes = {
    position: PropTypes.array.isRequired,
    units: PropTypes.array
  };

  constructor(props: Object) {
    super(props);

    this.state = {
      isMobile: window.innerWidth < mobileBreakpoint
    };

    this.onMoveend = this.onMoveend.bind(this);
    this.locateUser = this.locateUser.bind(this);
    this.updateIsMobile = this.updateIsMobile.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateIsMobile);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateIsMobile);
  }

  updateIsMobile() {
    this.setState({isMobile: window.innerWidth < mobileBreakpoint});
  }

  onMoveend(e: Object): void{
    const center = [e.target.getCenter().lat, e.target.getCenter().lng];
    this.props.handleMoveend(center);
  }

  locateUser() {
    this.refs.map.leafletElement.locate({setView: true});
  }

  render() {
    const {position, units, selected, handleClick} = this.props;
    const {isMobile} = this.state;

    return (
      <View id="map-view" className="map-view" isSelected={selected}>
        <Map ref="map" zoomControl={false} center={position} zoom={12} onMoveend={this.onMoveend} >
          <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {
            units && units.map(
              (unit, index) => //{console.log(unit); return <p key={index}>getAttr(unit.name)</p>;}
                <UnitMarker position={getUnitPosition(unit)} id={unit.id} status={unit.status} key={index} handleClick={handleClick} />
                // getAttr(unit.name)
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
      </View>
    );
  }
}
