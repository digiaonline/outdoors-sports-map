import React, {Component, PropTypes} from 'react';
import {withRouter} from 'react-router';
import ListView from './ListView.js';
import SMIcon from '../../home/components/SMIcon';
import values from 'lodash/values';
import {HEADER_HEIGHT} from '../../common/constants.js';
import {UnitFilters} from '../constants.js';
import UnitFilter from './UnitFilter.js';
import SearchContainer from '../../search/components/SearchContainer';

const ToggleButton = ({toggle, icon}) =>
  <button className="toggle-view-button" onClick={toggle}>
    <SMIcon icon={icon} />
  </button>;

const Header = ({expand, toggle, toggleIcon}) =>
<div className="header">
  <SearchContainer onSearch={expand}/>
  <ToggleButton toggle={toggle} icon={toggleIcon}/>
</div>;

class UnitBrowser extends Component {
  static propTypes = {
    units: PropTypes.array,
    activeFilter: PropTypes.array
  };

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      contentMaxHeight: null
    };

    this.calculateMaxHeight = this.calculateMaxHeight.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.updateContentMaxHeight = this.updateContentMaxHeight.bind(this);
    this.toggle = this.toggle.bind(this);
    this.expand = this.expand.bind(this);
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
    const isMobile = window.innerWidth < 768;
    const bottomSpace = isMobile ? 200 : 0;
    return window.innerHeight - HEADER_HEIGHT - bottomSpace;
  }

  toggleFilter(filter: string): void {
    const {activeFilter, router, location: query} = this.props;
    const NO_FILTER = 'no_filter';
    let newFilter = activeFilter.slice();

    if (newFilter.includes(NO_FILTER)) {
      const index = newFilter.indexOf(NO_FILTER);
      newFilter = [...newFilter.slice(0, index), ...newFilter.slice(index + 1)];
    }

    // Toggle given filter
    const index = newFilter.indexOf(filter);
    if (index === -1) {
      newFilter = [...newFilter, filter];
    } else {
      newFilter = [
        ...newFilter.slice(0, index),
        ...newFilter.slice(index + 1)
      ];
    }

    // Empty filter parameter defaults to DefaultFilters.
    newFilter = newFilter.length === 0 ? [NO_FILTER] : newFilter;

    router.push({
      query: Object.assign({}, query, {filter: newFilter})
    });
  }

  toggle() {
    this.setState({isExpanded: !this.state.isExpanded});
  }

  expand() {
    this.setState({isExpanded: true});
  }

  render() {
    const {units, isLoading, isSearching, position, activeFilter, openUnit, params} = this.props;
    const {isExpanded} = this.state;
    const contentMaxHeight = this.state.contentMaxHeight || this.calculateMaxHeight();

    return (
      <div className={`unit-browser ${isExpanded ? 'expanded' : ''}`} style={params.unitId ? {display: 'none'} : null}>
        <Header
          expand={this.expand}
          toggle={this.toggle}
          toggleIcon={isExpanded ? 'map-options' : 'browse'}
        />
        {isExpanded && !params.unitId &&
          <div className="unit-browser__content" style={{maxHeight: contentMaxHeight}}>
            <UnitFilter active={activeFilter} all={values(UnitFilters)} toggleFilter={this.toggleFilter} />
            <ListView activeFilter={activeFilter} isLoading={isLoading || isSearching} units={units} position={position} openUnit={openUnit} />
          </div>
        }
      </div>
    );
  }
}

export default withRouter(UnitBrowser);
