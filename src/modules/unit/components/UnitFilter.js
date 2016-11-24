import React from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import {translate} from 'react-i18next';
import invert from 'lodash/invert';
import SMIcon from '../../home/components/SMIcon';
import {getFilterIconURL} from '../helpers';
import {UnitFilters, SportFilters} from '../constants';

const FilterIcon = ({filter, active}) => {
  if (SportFilters.includes(filter)) {
    return (
      <img src={getFilterIconURL(filter, active)} alt=""/>
    );
  } else {
    return (
      <SMIcon icon="opening-hours"/>
    );
  }
};

const UnitFilter = translate()(({active = [], all, toggleFilter, t}) =>
  <Grid className="unit-filter" fluid={true}>
    <Row>
      {all && all.map((filter) =>
        <Col key={filter} xs={6}>
        <div className={`unit-filter__filter ${active.indexOf(filter) !== -1 ? 'active' : ''}`}
          onClick={() => toggleFilter(filter)}>
          <span className="unit-filter__filter-icon"><FilterIcon filter={filter} active={active.indexOf(filter) !== -1} /></span>
          <span className="unit-filter__filter-name">{t('UNIT.FILTER.' + invert(UnitFilters)[filter].toUpperCase())}</span>
        </div>
        </Col>
      )}
    </Row>
  </Grid>);

export default UnitFilter;
