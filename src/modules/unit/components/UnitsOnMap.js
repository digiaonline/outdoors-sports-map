import React from 'react';
import isEmpty from 'lodash/isEmpty';
import SingleUnitOnMap from './SingleUnitOnMap';
import {sortByCondition} from '../helpers';

export const UnitsOnMap = ({units, selectedUnitId, openUnit}) => {
  let unitsInOrder = units.slice();

  // Draw things in condition order
  unitsInOrder = sortByCondition(unitsInOrder).reverse();

  if(!isEmpty(unitsInOrder) && selectedUnitId) {
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
      !isEmpty(unitsInOrder) && unitsInOrder.map(
        (unit, index) =>
          <SingleUnitOnMap isSelected={unit.id === selectedUnitId} unit={unit} key={`${index}:${unit.id}`} openUnit={openUnit} />
      )
    }
    </div>
  );
};

export default UnitsOnMap;
