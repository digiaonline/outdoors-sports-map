import React from 'react';
import {Marker} from 'react-leaflet';
import {Icon} from 'leaflet';

const createIcon = (status = 'unknown') =>
  new Icon({
    iconUrl: require(`@assets/markers/marker-icon-${status}.png`),
    iconRetinaUrl: require(`@assets/markers/marker-icon-2x-${status}.png`),
    iconSize: [25, 41],
    iconAnchor: [12, 41]
  });

const UnitMarker = ({status, ...rest}) =>
  <Marker icon={createIcon(status)} {...rest} />;

export default UnitMarker;
