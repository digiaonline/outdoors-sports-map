import React, {Component, PropTypes} from 'react';
import {ListView} from './ListView.js';
import {Glyphicon} from 'react-bootstrap';
import {HEADER_HEIGHT} from '../../common/constants.js';
// import {getAttr} from '../helpers.js';
import {translate} from 'react-i18next';
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
      isExpanded: false
    };
  }

  render() {
    const {units} = this.props;
    const {isExpanded} = this.state;
    // Hackish way to make scrolling work
    const isMobile = window.innerWidth < 768;
    const bottomSpace = isMobile ? 200 : 0;
    const contentMaxHeight = window.innerHeight - HEADER_HEIGHT - bottomSpace;
    return (
      <div className={`unit-browser ${isExpanded ? 'expanded' : ''}`}>
        <Header
          toggle={() => this.setState({isExpanded: !isExpanded})}
          toggleGlyph={isExpanded ? 'globe' : 'list'}
        />
        <div className="unit-browser__content" style={{maxHeight: contentMaxHeight}}>
          <ListView units={units} show={isExpanded}/>
        </div>
      </div>
    );
  }
}
