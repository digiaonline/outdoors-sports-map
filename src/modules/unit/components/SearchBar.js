import React from 'react';
import {Link, withRouter} from 'react-router';
import {translate} from 'react-i18next';
import {Glyphicon} from 'react-bootstrap';
import ObservationStatus from './ObservationStatus';
import {getAttr, getUnitIconURL, getServiceName, getObservation} from '../helpers';


const SearchBar = translate()(({handleChange, searchResults, isLoading = true, t}) =>
  <div>
    <div className="search-container">
      <label htmlFor="search"><Glyphicon glyph="search"/></label>
      <input name="search"
             id="search"
             type="text"
             onChange={(e) => handleChange(e.target.value)}
             placeholder={isLoading ? t('GENERAL.LOADING') : `${t('SEARCH.SEARCH')}...`}
             disabled={isLoading}/>
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


export default withRouter(SearchBar);
