import React from 'react';
//import {getUnitGeometry} from '../helpers';
import UnitMarker from './UnitMarker';
//import UnitGeometry from './UnitGeometry';

const getUnitGeometry = () => false;
const UnitGeometry = UnitMarker;

export const UnitOnMap = ({unit, isSelected, openUnit, ...rest}) => {
  const geometry = getUnitGeometry(unit);

  return(
    <div>
    <UnitMarker unit={unit} isSelected={isSelected} handleClick={() => openUnit(unit.id)} {...rest}/>
    {geometry && <UnitGeometry unit={unit} onClick={() => openUnit(unit.id)} isSelected={isSelected}/> }
    </div>
  );
};

export default UnitOnMap;
