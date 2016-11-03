import React, {Component, PropTypes} from 'react';
import {Glyphicon} from 'react-bootstrap';
import sortBy from 'lodash/sortBy';
import {View} from './View.js';
import {getAttr} from '../helpers.js';
import {translate} from 'react-i18next';

const UnitListItem = translate()(({name, status, t}) => (
  <div className="list-view-item">
    <div>
      <div className="list-view-item__unit-marker" style={{color: '#666'}}><Glyphicon glyph="map-marker"/></div>
    </div>
    <div className="list-view-item__unit-details">
      <div className="list-view-item__unit-name">{name}</div>
      <div className="list-view-item__unit-status">{t('LIST.STATE')}: {status || t('LIST.UNKNOWN')}</div>
    </div>
    <div>
      <div className="list-view-item__unit-open"><Glyphicon glyph="chevron-right"/></div>
    </div>
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
