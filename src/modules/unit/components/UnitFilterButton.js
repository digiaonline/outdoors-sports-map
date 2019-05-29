//@flow
import React from 'react';
import {Button} from 'react-bootstrap';
import invert from 'lodash/invert';
import UnitFilterIcon from './UnitFilterIcon';
import DropdownIndicator from './DropdownIndicator';
import {UnitFilters} from '../constants';


const UnitFilterButton = ({t, filterName, className, showDropdownIndicator = false, ...rest}: {
  t: () => string,
  filterName: string,
  className: string
}) => (
  <Button className={`unit-filter-button ${className}`} {...rest}>
    <UnitFilterIcon className="unit-filter-button__icon" filter={filterName}/>
    <span className="unit-filter-button__name">
      {t(`UNIT.FILTER.${invert(UnitFilters)[filterName]}`)}
    </span>
    {showDropdownIndicator && <DropdownIndicator />}
  </Button>
);

export default UnitFilterButton;