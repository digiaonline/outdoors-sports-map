import React from 'react';
import isEmpty from 'lodash/isEmpty';
import SingleUnitOnMap from './SingleUnitOnMap';
import {sortByCondition} from '../helpers';

export const UnitsOnMap = ({units, selectedUnitId, openUnit, zoomLevel}) => {
  let unitsInOrder = units.slice();

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
          <SingleUnitOnMap isSelected={unit.id === selectedUnitId} unit={unit} zoomLevel={zoomLevel} key={`${index}:${unit.id}`} openUnit={openUnit} />
      )
    }
    </div>
  );
};

export default UnitsOnMap;
