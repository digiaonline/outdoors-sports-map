import React from 'react';
import {Marker} from 'react-leaflet';
import {Icon} from 'leaflet';
import {getUnitIconURL, getUnitPosition} from '../helpers';

const createIcon = (unit: Object, isSelected: boolean) =>
  new Icon({
    iconUrl: getUnitIconURL(unit, isSelected, false),
    iconRetinaUrl: getUnitIconURL(unit, isSelected),
    iconSize: [30, 36], // TODO: height 36 for skating etc and 30 for skiing
    iconAnchor: [15, 36]
  });

export const UnitMarker = ({unit, isSelected, handleClick, ...rest}) =>
  <Marker
    position={getUnitPosition(unit)}
    icon={createIcon(unit, isSelected)}
    onClick={handleClick}
    {...rest}/>;

export default UnitMarker;
