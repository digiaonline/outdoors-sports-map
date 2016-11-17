import React from 'react';
//import {getUnitGeometry} from '../helpers';
import UnitMarker from './UnitMarker';
import {GeoJSON} from 'react-leaflet';
//import UnitGeometry from './UnitGeometry';

const UnitGeometry = ({...rest}) => <GeoJSON {...rest}/>

export const UnitOnMap = ({unit, isSelected, openUnit, ...rest}) => {
  const geometry = unit.geometry;

  return(
    <div>
    <UnitMarker unit={unit} isSelected={isSelected} handleClick={() => openUnit(unit.id)} {...rest}/>
    {geometry && <UnitGeometry data={unit.geometry} onClick={() => openUnit(unit.id)} isSelected={isSelected}/> }
    </div>
  );
};

export default UnitOnMap;
