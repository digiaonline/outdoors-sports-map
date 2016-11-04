import React from 'react';
import {Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import {translate} from 'react-i18next';

const UnitFilter = translate()(({active, all, toggleFilter, t}) =>
  <Grid className="unit-filter" fluid={true}>
    <Row>
      {all && all.map((filter, index) =>
        <Col key={index} xs={6}>
        <div className={`unit-filter__filter ${active.indexOf(filter) !== -1 ? 'active' : ''}`}
          onClick={() => toggleFilter(filter)}>
          <span className="unit-filter__filter-icon"><Glyphicon glyph="map-marker"/></span>
          <span className="unit-filter__filter-name">{t('UNIT.FILTER.' + filter.toUpperCase())}</span>
        </div>
        </Col>
      )}
    </Row>
  </Grid>);

export default UnitFilter;
