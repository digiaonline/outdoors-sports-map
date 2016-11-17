import React from 'react';
import {GeoJSON} from 'react-leaflet';
import {getUnitQuality} from '../helpers.js';

export const UnitGeometry = ({unit, isSelected, ...rest}) => (
  <div className="unit-geometry">
    <GeoJSON // hilight
      className={
        `unit-geometry__hilight ${isSelected ? 'unit-geometry__hilight--show' : ''}`
      }
      data={unit.geometry} />
    <GeoJSON
      className={
        `unit-geometry__track unit-geometry__track--${getUnitQuality(unit)}`
      }
      data={unit.geometry} {...rest} />
  </div>
);

export default UnitGeometry;
