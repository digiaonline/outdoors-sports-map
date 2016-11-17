import React from 'react';
//import {getUnitGeometry} from '../helpers';
import UnitMarker from './UnitMarker';
import {GeoJSON} from 'react-leaflet';
import {getUnitQuality} from '../helpers.js';
import {UnitQualityColors} from '../constants.js';
//import UnitGeometry from './UnitGeometry';

const UnitGeometry = ({unit, isSelected, ...rest}) => (
  <div>
  <GeoJSON data={unit.geometry} color="black" weight="8" opacity={isSelected ? 1 : 0}/>
  <GeoJSON data={unit.geometry} weight="4" color={UnitQualityColors[getUnitQuality(unit)]} {...rest} />
  </div>
);

export const UnitOnMap = ({unit, isSelected, openUnit, ...rest}) => {
  const geometry = unit.geometry;

  return(
    <div>
    <UnitMarker unit={unit} isSelected={isSelected} handleClick={() => openUnit(unit.id)} {...rest}/>
    {geometry && <UnitGeometry unit={unit} onClick={() => openUnit(unit.id)} isSelected={isSelected}/> }
    </div>
  );
};

export default UnitOnMap;
