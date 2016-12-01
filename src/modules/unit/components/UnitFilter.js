import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {translate} from 'react-i18next';
import invert from 'lodash/invert';
import OSMIcon from '../../home/components/OSMIcon';
import {UnitFilters} from '../constants';

const FilterIcon = ({filter}) => {
  const SKIING_ICON = 'crosscountry';
  const STATUS_OK_ICON = 'status-ok';
  const STATUS_ANY_ICON = 'status-unknown';

  let iconName = filter;

  switch (filter) {
    case UnitFilters.SKIING:
      iconName = SKIING_ICON;
      break;
    case UnitFilters.OPEN_NOW: // FIXME -> STATUS_OK when refactoring filters
      iconName = STATUS_OK_ICON;
      break;
    case UnitFilters.STATUS_ANY:
      iconName = STATUS_ANY_ICON;
      break;
    default:
      // Use received filter
  }

  return <OSMIcon icon={iconName}/>;
};

const UnitFilter = translate()(({active = [], all, toggleFilter, t}) =>
  <Grid className="unit-filter" fluid={true}>
    <Row>
      {all && all.map((filter) =>
        <Col key={filter} xs={6}>
        <div className={`unit-filter__filter ${active.indexOf(filter) !== -1 ? 'active' : ''}`}
          onClick={() => toggleFilter(filter)}>
          <span className="unit-filter__filter-icon"><FilterIcon filter={filter} /></span>
          <span className="unit-filter__filter-name">{t('UNIT.FILTER.' + invert(UnitFilters)[filter].toUpperCase())}</span>
        </div>
        </Col>
      )}
    </Row>
  </Grid>);

export default UnitFilter;
