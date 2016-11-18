import React from 'react';
import {GeoJSON} from 'react-leaflet';
import {getUnitQuality} from '../helpers.js';

export const UnitGeometry = ({unit, isSelected, ...rest}) => (
  <div className="unit-geometry">
    <GeoJSON // hilight background
      className={
        `unit-geometry__hilight ${isSelected ? 'unit-geometry__hilight--show' : ''}`
      }
      opacity={isSelected ? 1 : 0}
      data={unit.geometry}
      {...rest}
       />
    <GeoJSON // actual track
      className={
        `unit-geometry__track unit-geometry__track--${getUnitQuality(unit)}`
      }
      data={unit.geometry} {...rest} />
  </div>
);

export default UnitGeometry;
