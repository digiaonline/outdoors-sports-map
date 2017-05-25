import React from 'react';
import {translate} from 'react-i18next';
import SMIcon from '../../home/components/SMIcon';

const SearchBar = translate()(({input, onInput, onSubmit, onClear, searchActive, disabled, t}) =>
<div className="search-bar">
  <form className="search-bar__input" onSubmit={(e) => {e.preventDefault(); onSubmit();}}>
    <label htmlFor="search"><SMIcon icon="search"/></label>
    {disabled &&
    <span className="search-bar__input-loading" onClick={onClear}>
      <SMIcon icon="loading"/>
    </span>
    }
    <input name="search"
        id="search"
        type="text"
        onChange={(e) => onInput(e.target.value)}
        placeholder={disabled ? `      ${t('GENERAL.LOADING')}` : `${t('SEARCH.SEARCH')}...`}
        disabled={disabled}
        value={input}
    />
    {(input || searchActive) &&
      <div className="search-bar__input-clear" onClick={onClear}>
        <SMIcon icon="close"/>
      </div>
    }
  </form>
</div>
);

export default SearchBar;