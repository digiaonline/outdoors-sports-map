import React from 'react';
import {Marker} from 'react-leaflet';
import {Icon} from 'leaflet';
import {getUnitIconURL, getUnitPosition, getUnitSport} from '../helpers';
import {UnitFilters} from '../constants';

export const getIconHeight = (unit: Object) =>
  getUnitSport(unit) === UnitFilters.SKIING ? 30 : 36;

const createIcon = (unit: Object, isSelected: boolean) => {
  const iconHeight = getIconHeight(unit)

  return new Icon({
    iconUrl: getUnitIconURL(unit, isSelected, false),
    iconRetinaUrl: getUnitIconURL(unit, isSelected),
    iconSize: [30, iconHeight],
    iconAnchor: [15, iconHeight]
  });
};

export const UnitMarker = ({unit, isSelected, handleClick, ...rest}) =>
  <Marker
    position={getUnitPosition(unit)}
    icon={createIcon(unit, isSelected)}
    onClick={handleClick}
    {...rest}/>;

export default UnitMarker;
