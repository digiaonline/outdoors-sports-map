// @flow
import React, {Component, PropTypes} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import {View} from './View.js';
import {Map, TileLayer} from 'react-leaflet';
import {getAttr} from '../helpers.js';
import UnitMarker from './UnitMarker.js';

export class MapView extends Component {
  static propTypes = {
    position: PropTypes.array.isRequired,
    units: PropTypes.array
  };

  constructor(props: Object) {
    super(props);

    this.onMoveend = this.onMoveend.bind(this);
    this.locateUser = this.locateUser.bind(this);
  }

  onMoveend(e: Object): void{
    const center = [e.target.getCenter().lat, e.target.getCenter().lng];
    this.props.handleMoveend(center);
  }

  locateUser() {
    this.refs.map.leafletElement.locate({setView: true});
  }

  render() {
    const {position, units, selected} = this.props;
    const createMarker = (unit, {...rest}) =>
      <UnitMarker
        position={unit.location.coordinates.reverse()}
        www={getAttr(unit.www_url)}
        name={getAttr(unit.name)}
        address={getAttr(unit.street_address)}
        description={getAttr(unit.description)}
        {...rest} />;
      // <Marker position={unit.location.coordinates.reverse()} key={key}>
      //   <Popup><div>{getAttr(unit.name)}</div></Popup>
      // </Marker>;

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
                <UnitMarker position={unit.location.coordinates.reverse()} status={unit.status} key={index} />
                // getAttr(unit.name)
            )
          }
        </Map>
        <div className="overlay-control">
          <Button bsSize="large" className="overlay-control__locate" onClick={this.locateUser}>
            <Glyphicon glyph="screenshot"/>
          </Button>
          <Button bsSize="large" className="overlay-control__info">
            <Glyphicon glyph="info-sign"/>
          </Button>
        </div>
      </View>
    );
  }
}
