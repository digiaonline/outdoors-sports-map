import React from 'react';
import {translate} from 'react-i18next';
import {Dropdown, MenuItem, Button, Glyphicon} from 'react-bootstrap';

const SortSelectorDropdown = translate()(({active, values, onSelect, t}) =>
  // <div className="unit-sort-selector">
  //   <DropdownButton className="unit-sort-selector" id="unit-sort-selector" title={t(`UNIT.SORT.${active.toUpperCase()}`)}>
  //     {values && values.map((key) =>
  //       <MenuItem key={key} eventKey={key} onSelect={onSelect}>{t(`UNIT.SORT.${key.toUpperCase()}`)}</MenuItem>
  //     )}
  //   </DropdownButton>
  // </div>
  //
  <Dropdown id="unit-sort-selector" className="unit-sort-selector">
    <Dropdown.Toggle noCaret>
      {t(`UNIT.SORT.${active.toUpperCase()}`)}
      <span className="custom-caret">
        <Glyphicon glyph="triangle-bottom"/>
      </span>
    </Dropdown.Toggle>
    <Dropdown.Menu>
    {values && values.map((key) =>
      <MenuItem key={key} eventKey={key} onSelect={onSelect}>{t(`UNIT.SORT.${key.toUpperCase()}`)}</MenuItem>
    )}
    </Dropdown.Menu>
  </Dropdown>
);

export default SortSelectorDropdown;
