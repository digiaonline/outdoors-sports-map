import React, {Component, PropTypes} from 'react';
import {withRouter} from 'react-router';
import {ListView} from './ListView.js';
import {Glyphicon} from 'react-bootstrap';
import values from 'lodash/values';
import {HEADER_HEIGHT} from '../../common/constants.js';
import {UnitFilters, DefaultFilters} from '../constants.js';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {searchTarget} from '../actions';
import {translate} from 'react-i18next';
import UnitFilter from './UnitFilter.js';
import {getAttr} from '../helpers.js';
import * as unitSelectors from '../selectors';

const SearchBar = translate()(({handleChange, searchResults, enabled, t}) =>
  <div>
    <div className="search-container">
      <label htmlFor="search"><Glyphicon glyph="search"/></label>
      <input name="search"
             id="search"
             type="text"
             onChange={(e) => handleChange(e.target.value)}
             placeholder={`${t('SEARCH.SEARCH')}...`}
             disabled={!enabled}/>
    </div>
    <SearchResults searchResults={searchResults}/>
  </div>
);

const SearchResults = ({searchResults}) => (
  <div className="search-results">
    {searchResults.length > 0
      ? <div>
          <a>näytä kaikki tulokset</a>
          {searchResults.map((result, index) =>
            <SearchResult key={index}>
              {index < 3
                ? <div>
                    <p>{getAttr(result.name)}</p>
                    {result.observations
                      ? <p style={{ background: '#72bc3d' }}>HYVÄ</p>
                      : <p style={{ background: '#a8b5c2' }}>UNKNOWN</p>
                    }
                    <p>Päivitetty eilen</p>
                  </div>
                : <div>
                    {getAttr(result.name)}
                  </div>
              }
            </SearchResult>
      )}
        </div>
      : null
    }
  </div>
);

const SearchResult = ({children}) =>
  <div className="search-results__result">
    {children}
  </div>;

const ToggleButton = ({toggle, glyph}) =>
  <button className="toggle-view-button" onClick={toggle}>
    <Glyphicon glyph={glyph}/>
  </button>;

const Header = ({toggle, toggleGlyph, searchResults, handleChange, searchEnabled}) =>
<div className="header">
  <SearchBar handleChange={handleChange} searchResults={searchResults} enabled={searchEnabled}/>
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
    this.onSearch = this.onSearch.bind(this);
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

  onSearch(value) {
    console.log(value);
    if (Object.keys(this.props.units).length > 0) {
      this.props.searchTarget(value);
    }
  }

  render() {
    const {units, position, activeFilter, searchResults, handleClick} = this.props;
    const {isExpanded} = this.state;
    const contentMaxHeight = this.state.contentMaxHeight || this.calculateMaxHeight();
    const searchEnabled = Object.keys(units).length > 0;

    return (
      <div className={`unit-browser ${isExpanded ? 'expanded' : ''}`}>
        <Header
          toggle={() => this.setState({isExpanded: !isExpanded})}
          toggleGlyph={isExpanded ? 'globe' : 'list'}
          handleChange={this.onSearch}
          searchResults={searchResults}
          searchEnabled={searchEnabled}
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
  bindActionCreators({searchTarget}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(UnitBrowser));
