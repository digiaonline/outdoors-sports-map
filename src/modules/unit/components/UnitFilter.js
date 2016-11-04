import React from 'react';
import {Grid, Row, Col, Glyphicon} from 'react-bootstrap';
import {translate} from 'react-i18next';

const UnitFilter = translate()(({active, all, t}) =>
  <Grid className="unit-filter" fluid={true}>
    <Row>
      {console.log(active, all)}
      {all && all.map((filter, index) =>
        <Col key={index} xs={6}>
        <div className={`unit-filter__filter ${active.indexOf(filter) !== -1 ? 'active' : ''}`}>
          <span className="unit-filter__filter-icon"><Glyphicon glyph="map-marker"/></span>
          <span className="unit-filter__filter-name">{t('UNIT.FILTER.' + filter.toUpperCase())}</span>
        </div>
        </Col>
      )}
    </Row>
  </Grid>);

export default UnitFilter;
