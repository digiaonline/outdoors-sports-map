import React from 'react';
import {translate} from 'react-i18next';
import {Glyphicon} from 'react-bootstrap';

const SearchBar = translate()(({input, onInput, onSubmit, onClear, searchActive, disabled, t}) =>
<div className="search-bar">
  <form className="search-bar__input" onSubmit={(e) => {console.log(e); e.preventDefault(); onSubmit();}}>
    <label htmlFor="search"><Glyphicon glyph="search"/></label>
    <input name="search"
        id="search"
        type="text"
        onChange={(e) => onInput(e.target.value)}
        placeholder={disabled ? t('GENERAL.LOADING') : `${t('SEARCH.SEARCH')}...`}
        disabled={disabled}
        value={input}
    />
    {(input || searchActive) &&
      <div className="search-bar__input-clear" onClick={onClear}>
        <Glyphicon glyph="remove"/>
      </div>
    }
  </form>
</div>
);

export default SearchBar;
