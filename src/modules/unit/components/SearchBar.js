import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
import {translate} from 'react-i18next';
import {Glyphicon} from 'react-bootstrap';
import ObservationStatus from './ObservationStatus';
import {getAttr, getUnitIconURL, getServiceName, getObservation} from '../helpers';

const SearchResults = ({searchResults}) => (
  <div className="search-results">
    {searchResults.length > 0
      ? <div className="search-results__list">
          <a>näytä kaikki tulokset</a>
          {searchResults.map((result, index) =>
            <SearchResult key={index} unit={result}/>
          )}
        </div>
      : null
    }
  </div>
);

const SearchResult = ({unit, ...rest}) =>
  <Link to={`/unit/${unit.id}`} className="search-results__result" {...rest}>
    <div className="search-results__result-icon">
      <img src={getUnitIconURL(unit)} alt={getServiceName(unit)} />
    </div>
    <div className="search-results__result-details">
      <div className="search-results__result-details__name">{getAttr(unit.name)}</div>
      <ObservationStatus observation={getObservation(unit)}/>
    </div>
  </Link>;


class SearchBar extends Component {

  constructor(props) {
    super(props);

    this.state = {
      input: ''
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.clearInput = this.clearInput.bind(this);
  }

  handleInput(value: string) {
    this.setState({input: value});
    this.props.handleChange(value);
  }

  handleSubmit() {
    // TODO
  }

  clearInput() {
    this.handleInput('');
  }

  render() {
    const {searchResults, isLoading = true, t} = this.props;
    const inputValue = this.state.input;

    return (
      <div className="search-bar">
        <div className="search-bar__input">
          <label htmlFor="search"><Glyphicon glyph="search"/></label>
          <input name="search"
              id="search"
              type="text"
              onChange={(e) => this.handleInput(e.target.value)}
              placeholder={isLoading ? t('GENERAL.LOADING') : `${t('SEARCH.SEARCH')}...`}
              disabled={isLoading}
              value={inputValue}
          />
          {inputValue &&
            <div className="search-bar__input-clear" onClick={this.clearInput}>
              <Glyphicon glyph="remove"/>
            </div>
          }
        </div>
        <SearchResults searchResults={searchResults}/>
      </div>
    );
  }
}


export default withRouter(translate()(SearchBar));
