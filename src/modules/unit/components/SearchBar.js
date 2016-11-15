import React, {Component} from 'react';
import {Link, withRouter} from 'react-router';
import {translate} from 'react-i18next';
import {Glyphicon} from 'react-bootstrap';
import ObservationStatus from './ObservationStatus';
import {getAttr, getUnitIconURL, getServiceName, getObservation} from '../helpers';

const SearchSuggestions = ({suggestions}) => (
  <div className="search-suggestions">
    {suggestions.length > 0
      ? <div className="search-suggestions__list">
          <a>näytä kaikki tulokset</a>
          {suggestions.map((result, index) =>
            <SearchSuggestion key={index} unit={result}/>
          )}
        </div>
      : null
    }
  </div>
);

const SearchSuggestion = ({unit, ...rest}) =>
  <Link to={`/unit/${unit.id}`} className="search-suggestions__result" {...rest}>
    <div className="search-suggestions__result-icon">
      <img src={getUnitIconURL(unit)} alt={getServiceName(unit)} />
    </div>
    <div className="search-suggestions__result-details">
      <div className="search-suggestions__result-details__name">{getAttr(unit.name)}</div>
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
    this.clearSearch = this.clearSearch.bind(this);
  }

  handleInput(value: string) {
    this.setState({input: value});
    this.props.handleChange(value);
  }

  handleSubmit(e) {
    e.preventDefault();
    // TODO
    console.log(this.state.input);
    this.props.router.push('?search=' + this.state.input);
    this.props.handleSubmit(this.state.input);
  }

  clearSearch() {
    this.props.clearSearch();
    this.setState({input: ''});
  }

  render() {
    const {searchSuggestions, isLoading = true, t} = this.props;
    const inputValue = this.state.input;

    return (
      <div className="search-bar">
        <form className="search-bar__input" onSubmit={this.handleSubmit}>
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
            <div className="search-bar__input-clear" onClick={this.clearSearch}>
              <Glyphicon glyph="remove"/>
            </div>
          }
        </form>
        <SearchSuggestions suggestions={searchSuggestions}/>
      </div>
    );
  }
}


export default withRouter(translate()(SearchBar));
