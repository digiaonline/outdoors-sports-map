import React, {Component, PropTypes} from 'react';
//import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

const Unit = ({position, name, address}) =>
  <Marker position={position}>
    <Popup>
      <span>{name}<br/>{address}</span>
    </Popup>
  </Marker>;


export class MapView extends Component {
  static propTypes = {
    position: PropTypes.array.isRequired,
    units: PropTypes.array
  };

  render() {
    const {position, units} = this.props;
    return (
      <div className="mapContainer">
        <Map center={position} zoom={12}>
          <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {units && units.map( (unit, index) => <Unit position={unit.location.coordinates.reverse()} name={unit.name.fi} key={index} />)}
        </Map>
      </div>
    );
  }
}