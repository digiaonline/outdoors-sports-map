import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Glyphicon} from 'react-bootstrap';
import sortBy from 'lodash/sortBy';
import {View} from './View.js';
import {getAttr, getUnitIconURL} from '../helpers.js';
import {translate} from 'react-i18next';

const UnitListItem = translate()(({id, name, status, updated, t}) => (
  <div className="list-view-item">
    <div className="list-view-item__unit-marker"><img src={getUnitIconURL(status)} alt=""/></div>
    <div className="list-view-item__unit-details">
      <div className="list-view-item__unit-name">{name}</div>
      <div className="list-view-item__unit-status">{status || t('UNIT.UNKNOWN')}</div>
      <div className="list-view-item__unit-updated">{t('UNIT.UPDATED')} {updated || t('UNIT.UNKNOWN')}</div>
    </div>
    <Link to={`unit/${id}`} className="list-view-item__unit-open">
        <Glyphicon glyph="chevron-right"/>
    </Link>
  </div>));


export class ListView extends Component {
  static propTypes = {
    units: PropTypes.array
  };

  render() {
    const {units} = this.props;
    return (
      <View id="list-view" className="list-view">
        <div className="list-view__container">
          <div className="list-view__block">
            {units && sortBy(units, ['distance']).map( (unit, index) =>
              <UnitListItem
              name={getAttr(unit.name)}
              address={getAttr(unit.street_address)}
              id={unit.id}
              key={index} />)}
          </div>
        </div>
      </View>
    );
  }
}
