import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {Glyphicon} from 'react-bootstrap';
import {isEqual, values} from 'lodash';
import * as unitHelpers from '../helpers';
import {SortKeys} from '../constants';
import {View} from './View.js';
import ObservationStatus from './ObservationStatus';
import SortSelectorDropdown from './SortSelectorDropdown';

const {getAttr} = unitHelpers;

const UnitListItem = ({unit, handleClick}) => {
  const observation = unitHelpers.getObservation(unit);
  const iconURL = unitHelpers.getUnitIconURL(unit);
  const serviceName = unitHelpers.getServiceName(unit);

  return (
  <div className="list-view-item">
    <div className="list-view-item__unit-marker"><img src={iconURL} alt={serviceName}/></div>
    <div className="list-view-item__unit-details">
      <div className="list-view-item__unit-name">{getAttr(unit.name)}</div>
      <ObservationStatus observation={observation}/>
    </div>
    <Link to={`/unit/${unit.id}`} className="list-view-item__unit-open" onClick={() => handleClick()}>
        <Glyphicon glyph="menu-right"/>
    </Link>
  </div>);
};

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
      sortKey: SortKeys.DISTANCE
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
        sortedUnits = unitHelpers.sortByName(props.units);
        break;
      case SortKeys.CONDITION:
        sortedUnits = unitHelpers.sortByCondition(props.units);
        break;
      case SortKeys.DISTANCE:
        sortedUnits = unitHelpers.sortByDistance(props.units, props.position);
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
              unit={unit}
              key={index}
              handleClick={handleClick}/>)}
          </div>
        </div>
      </View>
    );
  }
}
