import React from 'react';
import UnitSuggestion from './UnitSuggestions';

const SearchSuggestions = ({units}) => (
  <div className="search-suggestions">
    {units.length > 0
      ? <div className="search-suggestions__list">
          <a>näytä kaikki tulokset</a>
          {units.map((result, index) =>
            <UnitSuggestion key={index} unit={result}/>
          )}
        </div>
      : null
    }
  </div>
);

export default SearchSuggestions;
