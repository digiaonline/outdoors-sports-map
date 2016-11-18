import React from 'react';
import SingleUnitOnMap from './SingleUnitOnMap';
import {sortByCondition} from '../helpers';

export const UnitsOnMap = ({units, selectedUnitId, openUnit}) => {
  let unitsInOrder = units.slice();

  // Draw things in condition order
  unitsInOrder = sortByCondition(unitsInOrder).reverse();

  if(selectedUnitId) {
    const index = unitsInOrder.findIndex((unit) => unit.id === selectedUnitId);
    const selectedUnit = unitsInOrder[index];

    unitsInOrder = [
      ...unitsInOrder.slice(0, index),
      ...unitsInOrder.slice(index + 1),
      selectedUnit
    ];
  }

  return(
    <div className="units-on-map">
    {
      unitsInOrder && unitsInOrder.map(
        (unit, index) => //{console.log(unit); return <p key={index}>getAttr(unit.name)</p>;}
          <SingleUnitOnMap isSelected={unit.id === selectedUnitId} unit={unit} key={index} openUnit={openUnit} />
      )
    }
    </div>
  );
};

export default UnitsOnMap;
