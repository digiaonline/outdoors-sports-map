import React, {Component, PropTypes} from 'react';
import sortBy from 'lodash/sortBy';
import {View} from './View.js';
import {getAttr} from '../helpers.js';
import {translate} from 'react-i18next';

const UnitListItem = translate()(({name, address, details, t}) => (
  <div className="list-view-item">
    <div className="list-view-item__unit-name">{name}</div>
    <div className="list-view-item__unit-address">{address}</div>
    {/* TODO/FIXME: Translate label and get actual status data */}
    <div className="list-view-item__unit-status">{t('LIST.STATE')}: {t('LIST.UNKNOWN')}</div>
    <div className="list-view-item__unit-details">{details}</div>
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
            Here will be filters
          </div>
          <div className="list-view__block">
            {units && sortBy(units, ['distance']).map( (unit, index) =>
              <UnitListItem
              name={getAttr(unit.name)}
              address={getAttr(unit.street_address)}
              details={getAttr(unit.description)}
              key={index} />)}
          </div>
        </div>
      </View>
    );
  }
}
