import React, {Component, PropTypes} from 'react';
import {translate} from 'react-i18next';
import {Link} from 'react-router';
import {isEqual, values} from 'lodash';
import SMIcon from '../../home/components/SMIcon';
import * as unitHelpers from '../helpers';
import {SortKeys, UNIT_BATCH_SIZE} from '../constants';
import {View} from './View.js';
import Loading from '../../home/components/Loading';
import ObservationStatus from './ObservationStatus';
import SortSelectorDropdown from './SortSelectorDropdown';

//const {getAttr} = unitHelpers;

const UnitListItem = ({unit, handleClick}, context) => {
  const iconURL = unitHelpers.getUnitIconURL(unit);
  const serviceName = unitHelpers.getServiceName(unit, context.getActiveLanguage());

  return (
  <Link to={`/unit/${unit.id}`} className="list-view-item">
    <div className="list-view-item__unit-marker"><img src={iconURL} alt={serviceName}/></div>
    <div className="list-view-item__unit-details">
      <div className="list-view-item__unit-name">{unitHelpers.getAttr(unit.name, context.getActiveLanguage())}</div>
      <ObservationStatus unit={unit}/>
    </div>
    <div className="list-view-item__unit-open" onClick={() => handleClick()}>
        <SMIcon icon="forward"/>
    </div>
  </Link>);
};

UnitListItem.contextTypes = {
  getActiveLanguage: React.PropTypes.func
};

class ListView extends Component {
  static propTypes = {
    units: PropTypes.array,
    sortKey: PropTypes.string
  };

  state: {
    sortKey: string,
    maxUnitCount: number
  };

  constructor(props) {
    super(props);
    this.state = {
      sortKey: SortKeys.DISTANCE,
      maxUnitCount: UNIT_BATCH_SIZE
    };

    this.selectSortKey = this.selectSortKey.bind(this);
    this.loadMoreUnits = this.loadMoreUnits.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (!isEqual(nextProps.units, this.props.units) || !isEqual(nextProps.activeFilter, this.props.activeFilter)) {
      this.resetUnitCount();
    }
  }

  sortUnits(props, sortKey) {
    let sortedUnits = [];
    switch(sortKey) {
      case SortKeys.ALPHABETICAL:
        sortedUnits = unitHelpers.sortByName(props.units, this.context.getActiveLanguage());
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
    this.resetUnitCount();
  }

  loadMoreUnits() {
    this.setState({maxUnitCount: this.state.maxUnitCount + UNIT_BATCH_SIZE});
  }

  resetUnitCount() {
    this.setState({maxUnitCount: UNIT_BATCH_SIZE});
  }

  render() {
    const {openUnit, isLoading, t} = this.props;
    const {sortKey, maxUnitCount} = this.state;
    const totalUnits = this.props.units.length;
    const units = isLoading ? [] : this.sortUnits(this.props, sortKey).slice(0, maxUnitCount);
    return (
      <View id="list-view" className="list-view">
        <div className="list-view__container">
          <div className="list-view__block">
            <SortSelectorDropdown values={values(SortKeys)} active={sortKey} onSelect={this.selectSortKey}/>
          </div>
          <div className="list-view__block">
            {isLoading && <Loading/>}
            {units && units.map( (unit) =>
              <UnitListItem
              unit={unit}
              key={unit.id}
              handleClick={() => openUnit(unit.id)}/>)}
            {
              units.length !== totalUnits &&
              <a style={{display: 'block', textAlign: 'center', cursor: 'pointer'}} onClick={this.loadMoreUnits}>
                {t('UNIT.SHOW_MORE')}
              </a>
            }
          </div>
        </div>
      </View>
    );
  }
}

ListView.contextTypes = {
  getActiveLanguage: React.PropTypes.func
};

export default translate()(ListView);
