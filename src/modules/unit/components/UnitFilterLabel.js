import React from 'react';
import {translate} from 'react-i18next';

const filterNameToLabel = (filterName) => {
  switch (filterName) {
    case 'sport': return 'UNIT.FILTER_SPORT';
    case 'status': return 'UNIT.FILTER_STATUS';
  }
  console.log(`UnitFilterLabel: Unknown filter "${filterName}"`);
  return '';
};

const UnitFilterLabel = ({filterName, t}) => {
  const message = filterNameToLabel(filterName);
  if (!message) {
    return null;
  }
  return (
    <div className="unit-filter-label">
      <span>{t(message)}:</span>
    </div>
  );
};

export default translate()(UnitFilterLabel);