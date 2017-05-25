import React from 'react';
import {GeoJSON} from 'react-leaflet';
import {getUnitQuality} from '../helpers.js';

class UnitGeometry extends React.Component {
  render () {
    const {unit, isSelected, ...rest} = this.props;
    return (
      <div className="unit-geometry">
        { // hilight background for selected unit
          isSelected &&
          <GeoJSON
            className={
              `unit-geometry__hilight ${isSelected ? 'unit-geometry__hilight--show' : ''}`
            }
            key={`${unit.id}_hilight`}
            opacity={isSelected ? 1 : 0}
            data={unit.geometry}
            {...rest}
           />
        }
        <GeoJSON // Click area
          className="unit-geometry__click-area"
          key={`${unit.id}_click-area`}
          data={unit.geometry}
          {...rest} />
        <GeoJSON // actual track
          ref='feature'
          className={
            `unit-geometry__track unit-geometry__track--${getUnitQuality(unit)}`
          }
          key={unit.id}
          data={unit.geometry}
          {...rest} />
      </div>
    );
  }
}

export default UnitGeometry;