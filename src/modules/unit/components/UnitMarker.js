import React from 'react';
import {Marker} from 'react-leaflet';
import {Icon} from 'leaflet';
import {getUnitIconURL, getUnitPosition, getUnitSport} from '../helpers';
import {UnitFilters} from '../constants';

const POINTER_ICON_HEIGHT = 36;
const HANDLE_ICON_HEIGHT = 30;
const ICON_WIDTH = 30;

const getIconHeight = (unit: Object) =>
  getUnitSport(unit) === UnitFilters.SKIING ? HANDLE_ICON_HEIGHT : POINTER_ICON_HEIGHT;

const getAnchorHeight = (unit: Objcect) =>
  getUnitSport(unit) === UnitFilters.SKIING ? HANDLE_ICON_HEIGHT / 2 : POINTER_ICON_HEIGHT;

const createIcon = (unit: Object, isSelected: boolean) => {
  const iconHeight = getIconHeight(unit);
  const anchorHeight = getAnchorHeight(unit);

  return new Icon({
    iconUrl: getUnitIconURL(unit, isSelected, false),
    iconRetinaUrl: getUnitIconURL(unit, isSelected),
    iconSize: [ICON_WIDTH, iconHeight],
    iconAnchor: [ICON_WIDTH / 2, anchorHeight]
  });
};

// TODO: Use only getUnitPosition when ski tracks
// have correct locations in backend.
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
