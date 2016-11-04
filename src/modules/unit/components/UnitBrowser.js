import React, {Component, PropTypes} from 'react';
import {ListView} from './ListView.js';
import {Glyphicon} from 'react-bootstrap';
import values from 'lodash/values';
import {HEADER_HEIGHT} from '../../common/constants.js';
import {UnitFilters, DefaultFilters} from '../constants.js';
import {translate} from 'react-i18next';
import UnitFilter from './UnitFilter.js';
//

// const Filters = () => <div className="unit-browser__box filters"></div>;
// const Header = translate()(({toggleViewGlyph, toggleView, t}) =>
//   <div id="header" className="header">
//     <div className="search-container">
//       <label htmlFor="search"><Glyphicon glyph="search"/></label>
//       <input name="search" id="search" type="text" placeholder={`${t('SEARCH.SEARCH')}...`} />
//     </div>
//     <button className="toggle-view-button" onClick={toggleView}><Glyphicon glyph={toggleViewGlyph}/></button>
//   </div>);

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

export class UnitBrowser extends Component {
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

  render() {
    console.log('Hello!');
    const {units, handleClick} = this.props;
    const {isExpanded} = this.state;
    const contentMaxHeight = this.state.contentMaxHeight || this.calculateMaxHeight();
    const filter = location.query && location.query.filter || DefaultFilters;

    return (
      <div className={`unit-browser ${isExpanded ? 'expanded' : ''}`}>
        <Header
          toggle={() => this.setState({isExpanded: !isExpanded})}
          toggleGlyph={isExpanded ? 'globe' : 'list'}
        />
        <div className="unit-browser__content" style={{maxHeight: contentMaxHeight}}>
          <UnitFilter active={filter} all={values(UnitFilters)} />
          <ListView units={units} show={isExpanded} handleClick={handleClick}/>
        </div>
      </div>
    );
  }
}
