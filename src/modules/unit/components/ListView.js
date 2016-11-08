import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Glyphicon} from 'react-bootstrap';
import {isEqual, values} from 'lodash';
import {sortByDistance, sortByName} from '../helpers';
import {SortKeys} from '../constants';
import {View} from './View.js';
import SortSelectorDropdown from './SortSelectorDropdown';
import {getAttr, getUnitIconURL} from '../helpers.js';
import {translate} from 'react-i18next';

const UnitListItem = translate()(({id, name, status, updated, handleClick, t}) => (
  <div className="list-view-item">
    <div className="list-view-item__unit-marker"><img src={getUnitIconURL(status)} alt=""/></div>
    <div className="list-view-item__unit-details">
      <div className="list-view-item__unit-name">{name}</div>
      <div className="list-view-item__unit-status">{status || t('UNIT.UNKNOWN')}</div>
      <div className="list-view-item__unit-updated">{t('UNIT.UPDATED')} {updated || t('UNIT.UNKNOWN')}</div>
    </div>
    <Link to={`/unit/${id}`} className="list-view-item__unit-open" onClick={() => handleClick()}>
        <Glyphicon glyph="chevron-right"/>
    </Link>
  </div>));

export class ListView extends Component {
  static propTypes = {
    units: PropTypes.array,
    sortKey: PropTypes.string
  };

  state: {
    sortKey: string
  }

  constructor(props) {
    super(props);
    this.state = {
      sortKey: SortKeys.DEFAULT
    };

    this.selectSortKey = this.selectSortKey.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.units, this.props.units) || !isEqual(nextProps.position, this.props.position)) {
      this.sortUnits(nextProps);
    }
  }

  sortUnits(props, sortKey) {
    let sortedUnits = [];
    switch(sortKey) {
      case SortKeys.ALPHABETICAL:
        sortedUnits = sortByName(props.units);
        break;
      case SortKeys.DISTANCE:
        sortedUnits = sortByDistance(props.units, props.position);
        break;
      default:
        sortedUnits = props.units;
    }

    return sortedUnits;
  }

  selectSortKey(sortKey: string) {
    this.setState({sortKey: sortKey});
  }

  render() {
    const {handleClick} = this.props;
    const {sortKey} = this.state;
    const units = this.sortUnits(this.props, sortKey);
    return (
      <View id="list-view" className="list-view">
        <div className="list-view__container">
          <div className="list-view__block">
            <SortSelectorDropdown values={values(SortKeys)} active={sortKey} onSelect={this.selectSortKey}/>
          </div>
          <div className="list-view__block">
            {units && units.map( (unit, index) =>
              <UnitListItem
              name={getAttr(unit.name)}
              address={getAttr(unit.street_address)}
              id={unit.id}
              key={index}
              handleClick={handleClick}/>)}
          </div>
        </div>
      </View>
    );
  }
}
