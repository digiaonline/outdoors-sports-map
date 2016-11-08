import React, {Component, PropTypes} from 'react';
import {withRouter} from 'react-router';
import {ListView} from './ListView.js';
import {Glyphicon} from 'react-bootstrap';
import values from 'lodash/values';
import {HEADER_HEIGHT} from '../../common/constants.js';
import {UnitFilters, DefaultFilters} from '../constants.js';
import {translate} from 'react-i18next';
import UnitFilter from './UnitFilter.js';

const SearchBar = translate()(({t}) =>
  <div className="search-container">
    <label htmlFor="search"><Glyphicon glyph="search"/></label>
    <input name="search" id="search" type="text" placeholder={`${t('SEARCH.SEARCH')}...`} />
  </div>);
const ToggleButton = ({toggle, glyph}) =>
  <button className="toggle-view-button" onClick={toggle}>
    <Glyphicon glyph={glyph}/>
  </button>;
const Header = ({toggle, toggleGlyph}) =>
<div className="header">
  <SearchBar/>
  <ToggleButton toggle={toggle} glyph={toggleGlyph}/>
</div>;

class UnitBrowser extends Component {
  static propTypes = {
    units: PropTypes.array,
    activeFilter: PropTypes.array
  };

  static defaultProps = {
    activeFilter: DefaultFilters
  }

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false,
      contentMaxHeight: null
    };

    this.calculateMaxHeight = this.calculateMaxHeight.bind(this);
    this.toggleFilter = this.toggleFilter.bind(this);
    this.updateContentMaxHeight = this.updateContentMaxHeight.bind(this);
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

  render() {
    const {units, activeFilter, handleClick, position} = this.props;
    const {isExpanded} = this.state;
    const contentMaxHeight = this.state.contentMaxHeight || this.calculateMaxHeight();

    return (
      <div className={`unit-browser ${isExpanded ? 'expanded' : ''}`}>
        <Header
          toggle={() => this.setState({isExpanded: !isExpanded})}
          toggleGlyph={isExpanded ? 'globe' : 'list'}
        />
        <div className="unit-browser__content" style={{maxHeight: contentMaxHeight}}>
          <UnitFilter active={activeFilter} all={values(UnitFilters)} toggleFilter={this.toggleFilter} />
          <ListView units={units} position={position} show={isExpanded} handleClick={handleClick} />
        </div>
      </div>
    );
  }
}

export default withRouter(UnitBrowser);
