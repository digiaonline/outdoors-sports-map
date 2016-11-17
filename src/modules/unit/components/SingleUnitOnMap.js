import React from 'react';
//import {getUnitGeometry} from '../helpers';
import UnitMarker from './UnitMarker';
import UnitGeometry from './UnitGeometry';

export const SingleUnitOnMap = ({unit, isSelected, openUnit, ...rest}) => {
  const geometry = unit.geometry;

  return(
    <div>
    <UnitMarker unit={unit} isSelected={isSelected} handleClick={() => openUnit(unit.id)} {...rest}/>
    {geometry && <UnitGeometry unit={unit} onClick={() => openUnit(unit.id)} isSelected={isSelected}/> }
    </div>
  );
};

export default SingleUnitOnMap;
