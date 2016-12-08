import React, {Component, PropTypes} from 'react';
import {withRouter} from 'react-router';
import ListView from './ListView.js';
import SMIcon from '../../home/components/SMIcon';
import values from 'lodash/values';
import {DefaultFilters, SportFilters, StatusFilters} from '../constants.js';
import UnitFilter from './UnitFilter.js';
import SearchContainer from '../../search/components/SearchContainer';
import {getAddressToDisplay} from '../helpers';

const ToggleButton = ({toggle, icon}) =>
  <button className="toggle-view-button" onClick={toggle}>
    <SMIcon className="unit-browser__toggle" icon={icon} />
  </button>;

const Header = ({expand, toggle, toggleIcon, openUnit, setView}) =>
<div className="header">
  <SearchContainer onSearch={expand} openUnit={openUnit} setView={setView}/>
  <ToggleButton toggle={toggle} icon={toggleIcon}/>
</div>;

const AddressBar = ({address, handleClick}, context) =>
  <div className="address-bar__container" onClick={() => handleClick(address.location.coordinates.slice().reverse())}>
    <img className="address-bar__marker" src={require('../../../../assets/markers/location.svg')} height="20px" width="16px"/>
    {address && getAddressToDisplay(address, context.getActiveLanguage())}
  </div>;

AddressBar.contextTypes = {
  getActiveLanguage: React.PropTypes.func
};

class UnitBrowser extends Component {
  static propTypes = {
    units: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      contentMaxHeight: null
    };

    this.calculateMaxHeight = this.calculateMaxHeight.bind(this);
    this.toggleStatusFilter = this.toggleStatusFilter.bind(this);
    this.toggleSportFilter = this.toggleSportFilter.bind(this);
    this.updateContentMaxHeight = this.updateContentMaxHeight.bind(this);
    this.toggle = this.toggle.bind(this);
    this.expand = this.expand.bind(this);
    this.updateQueryParameter = this.updateQueryParameter.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.updateContentMaxHeight);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateContentMaxHeight);
  }

  updateContentMaxHeight() {
    this.setState({contentMaxHeight: this.calculateMaxHeight()});
  }

  calculateMaxHeight() {
    const fixedPartHeight = document.getElementById('always-visible').offsetHeight;
    return window.innerHeight - fixedPartHeight;
  }

  updateQueryParameter(key: string, value: string): void {
    const {router, location: {query}} = this.props;

    router.push({
      query: Object.assign({}, query, {[key]: value})
    });
  }

  toggleStatusFilter(filter: string): void {
    this.updateQueryParameter('status', filter);
  }

  toggleSportFilter(sport: string): void {
    this.updateQueryParameter('sport', sport);
  }

  toggle() {
    this.setState({isExpanded: !this.state.isExpanded});
  }

  expand() {
    this.setState({isExpanded: true});
  }

  render() {
    const {units, services, isLoading, isSearching, position, openUnit, setView, address, params, location: {query}} = this.props;
    const {isExpanded} = this.state;
    let contentMaxHeight = this.state.contentMaxHeight;
    if (isExpanded) {
      contentMaxHeight = contentMaxHeight || this.calculateMaxHeight();
    }

    const currentSportFilter = query && query.sport || DefaultFilters.sport;
    const currentStatusFilter = query && query.status || DefaultFilters.status;

    return (
      <div className={`unit-browser ${isExpanded ? 'expanded' : ''}`} style={params.unitId ? {display: 'none'} : null}>
        <div id="always-visible" className="unit-browser__fixed">
        <Header
          expand={this.expand}
          toggle={this.toggle}
          toggleIcon={isExpanded ? 'map-options' : 'browse'}
          setView={setView}
          openUnit={openUnit}
        />
        {!isLoading && <UnitFilter active={currentSportFilter} all={values(SportFilters)} toggleFilter={this.toggleSportFilter} />}
        {!isLoading && <UnitFilter active={currentStatusFilter} all={values(StatusFilters)} toggleFilter={this.toggleStatusFilter} />}
        {!isLoading && Object.keys(address).length !== 0 && <AddressBar handleClick={setView} address={address} />}
      </div>
        <div className="unit-browser__content" style={{maxHeight: contentMaxHeight}}>
          <ListView isLoading={isLoading || isSearching} units={units} services={services} position={position} openUnit={openUnit} />
        </div>
      </div>
    );
  }
}

export default withRouter(UnitBrowser);
