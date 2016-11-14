import React, {Component, PropTypes} from 'react';
import {withRouter} from 'react-router';
import {ListView} from './ListView.js';
import {Glyphicon} from 'react-bootstrap';
import values from 'lodash/values';
import {HEADER_HEIGHT} from '../../common/constants.js';
import {UnitFilters, DefaultFilters} from '../constants.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchUnits} from '../actions';
import UnitFilter from './UnitFilter.js';
import SearchBar from './SearchBar.js';
import * as unitSelectors from '../selectors';

const ToggleButton = ({toggle, glyph}) =>
  <button className="toggle-view-button" onClick={toggle}>
    <Glyphicon glyph={glyph}/>
  </button>;

const Header = ({toggle, isLoading, toggleGlyph, searchResults, handleChange, searchEnabled}) =>
<div className="header">
  <SearchBar isLoading={isLoading} handleChange={handleChange} searchResults={searchResults} enabled={searchEnabled}/>
  <ToggleButton toggle={toggle} glyph={toggleGlyph}/>
</div>;

class UnitBrowser extends Component {
  static propTypes = {
    units: PropTypes.array,
    activeFilter: PropTypes.array
  };

  static defaultProps = {
    activeFilter: DefaultFilters
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
    this.onSearchInput = this.onSearchInput.bind(this);
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

  toggleFilter(filter) {
    const {activeFilter, router} = this.props;
    let newFilter = Array.isArray(activeFilter) ? activeFilter.slice() : [activeFilter];
    const index = newFilter.indexOf(filter);
    if (index === -1) {
      newFilter = [...newFilter, filter];
    } else {
      newFilter = [
        ...newFilter.slice(0, index),
        ...newFilter.slice(index + 1)
      ];
    }

    router.push({
      query: {filter: newFilter}
    });
  }

  onSearchInput(value) {
    if (Object.keys(this.props.units).length > 0) {
      this.props.searchUnits(value);
    }
  }

  render() {
    const {units, isLoading, position, activeFilter, searchResults, handleClick} = this.props;
    const {isExpanded} = this.state;
    const contentMaxHeight = this.state.contentMaxHeight || this.calculateMaxHeight();

    return (
      <div className={`unit-browser ${isExpanded ? 'expanded' : ''}`}>
        <Header
          toggle={() => this.setState({isExpanded: !isExpanded})}
          toggleGlyph={isExpanded ? 'globe' : 'list'}
          handleChange={this.onSearchInput}
          searchResults={searchResults}
          isLoading={isLoading}
        />
        {isExpanded &&
          <div className="unit-browser__content" style={{maxHeight: contentMaxHeight}}>
            <UnitFilter active={activeFilter} all={values(UnitFilters)} toggleFilter={this.toggleFilter} />
            <ListView units={units} position={position} show={isExpanded} handleClick={handleClick} />
          </div>
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  searchResults: unitSelectors.getSearchResults(state)
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({searchUnits}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UnitBrowser));
