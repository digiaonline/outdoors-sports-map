import React, {Component, PropTypes} from 'react';
//import {render} from 'react-dom';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';

const position = {
  helsinki: [60.171944, 24.941389],
  espoo: [60.19792, 24.708885],
  vantaa: [60.309045, 25.004675]
};

const Unit = ({position, name, address}) =>
  <Marker position={position}>
    <Popup>
      <span>{name}<br/>{address}</span>
    </Popup>
  </Marker>;


export class MapView extends Component {
  static propTypes = {
    position: PropTypes.array,
    units: PropTypes.array
  };

  static defaultProps = {
    'position': position.helsinki,
    'units': [position.helsinki, position.espoo, position.vantaa]
  };

  render() {
    const {position, units} = this.props;
    return (
      <div className="mapContainer">
        <Map center={position} zoom={10}>
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