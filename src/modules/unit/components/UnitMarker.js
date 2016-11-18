import React from 'react';
import {Marker} from 'react-leaflet';
import {Icon} from 'leaflet';
import {getUnitIconURL, getUnitPosition, getUnitSport} from '../helpers';
import {UnitFilters} from '../constants';

export const getIconHeight = (unit: Object) =>
  getUnitSport(unit) === UnitFilters.SKIING ? 30 : 36;

export const getAnchorHeight = (unit: Objcect) =>
  getUnitSport(unit) === UnitFilters.SKIING ? 15 : 36;

const createIcon = (unit: Object, isSelected: boolean) => {
  const iconHeight = getIconHeight(unit);
  const anchorHeight = getAnchorHeight(unit);

  return new Icon({
    iconUrl: getUnitIconURL(unit, isSelected, false),
    iconRetinaUrl: getUnitIconURL(unit, isSelected),
    iconSize: [30, iconHeight],
    iconAnchor: [15, anchorHeight]
  });
};

const temporarilyGetUnitPosition = (unit: Object) => {
  if (!unit.geometry || !unit.geometry.coordinates) {
    return getUnitPosition(unit);
  }
  return unit.geometry.coordinates[0][0].slice().reverse();

};

export const UnitMarker = ({unit, isSelected, handleClick, ...rest}) =>
  <Marker
    position={temporarilyGetUnitPosition(unit)}
    icon={createIcon(unit, isSelected)}
    onClick={handleClick}
    {...rest}/>;

export default UnitMarker;
