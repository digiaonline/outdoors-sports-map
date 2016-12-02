import React from 'react';
import isEmpty from 'lodash/isEmpty';
import SingleUnitOnMap from './SingleUnitOnMap';
import {sortByCondition, getUnitQuality} from '../helpers';

export const UnitsOnMap = ({units, selectedUnitId, openUnit, zoomLevel}) => {
  let unitsInOrder = units.slice();
  const originalLength = unitsInOrder.length;

  // Draw things in condition order
  unitsInOrder = sortByCondition(unitsInOrder).reverse();

  if(!isEmpty(unitsInOrder) && selectedUnitId) {
    const selectedUnit = unitsInOrder.find((unit) => unit.id === selectedUnitId);

    !isEmpty(selectedUnit) && unitsInOrder.push(selectedUnit);
  }

  return(
    <div className="units-on-map">
    {
      !isEmpty(unitsInOrder) && unitsInOrder.map(
        (unit, index) =>
          <SingleUnitOnMap isSelected={unit.id === selectedUnitId} unit={unit} zoomLevel={zoomLevel} key={`${unit.id}:${getUnitQuality(unit)}:${index === originalLength}`} openUnit={openUnit} />
      )
    }
    </div>
  );
};

export default UnitsOnMap;
