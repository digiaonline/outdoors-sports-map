import React from 'react';
import {translate} from 'react-i18next';
import UnitSuggestion from './UnitSuggestions';

const SearchSuggestions = translate()(({units, addresses, openAllResults, t}) => (
  <div className="search-suggestions">
    {units.length > 0 || addresses.length > 0
      ? <div className="search-suggestions__list">
          <a className="search-suggestions__open-all" onClick={openAllResults}>{t('SEARCH.SHOW_ALL_RESULTS')}</a>
          {units.map((result) =>
            <UnitSuggestion key={result.id} unit={result}/>
          )}
        {addresses.map((address) =>
          <p>{address.properties.label}</p>
        )}
        </div>
      : null
    }
  </div>
));

export default SearchSuggestions;
