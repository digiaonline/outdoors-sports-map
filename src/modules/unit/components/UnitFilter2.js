//@flow
import React from 'react';
import {translate} from 'react-i18next';
import {Grid, Row, Col, Button} from 'react-bootstrap';
import invert from 'lodash/invert';

import {FilterIcon} from './UnitFilter.js';
import {UnitFilters} from '../constants';

/*
 * TODO:
 * - Move extra components to their own files
 * - Add logic & config to decide which sports are on/off-season
 */


type UnitFiltersProps = {
  filters: Array<UnitFilterProps>,
  t: () => string,
  updateFilter: (filter: string, value: string) => void,
};

type UnitFilterProps = {
  name: string,
  active: string,
  options: Array<string>,
  secondaryOptions: ?Array<string>,
};

type UnitFiltersState = {
  expand: ?number
};

const UnitFilterButton = ({t, filterName, className, ...rest}) => (
  <Button className={`unit-filter-button ${className}`} {...rest}>
    <FilterIcon className="unit-filter-button__icon" filter={filterName}/>
    <span className="unit-filter-button__name">
      {t(`UNIT.FILTER.${invert(UnitFilters)[filterName]}`)}
    </span>
  </Button>
);

const FilterOptionsRow = translate()(({t, className, filterName, options, active = null, onSelect}) => (
  <Row className={`${className} filter-options-row`}>
    {options.map((option) => (
      <Col className="unit-filters__option" xs={6} key={option}>
        <UnitFilterButton
          t={t}
          className={active === option ? 'active' : ''}
          filterName={option}
          onClick={() => onSelect(filterName, option)}
        />
      </Col>
    ))}
  </Row>
));

export class UnitFilters2 extends React.Component {
  props: UnitFiltersProps;

  state: UnitFiltersState;

  onMenuSelect(key: string, value: string): void {
    this.setState(
      ({expand}) => ({expand: null}))
    this.props.updateFilter(key, value);
  }

  constructor(props: UnitFiltersProps){
    super(props);
    this.onMenuSelect = this.onMenuSelect.bind(this);

    this.state = {
      expand: null,
    };
  }

  render() {
    const {filters, updateFilter, t} = this.props;
    const {expand} = this.state;

    const FilterOptions = ({filter}: {filter: UnitFilterProps}) => (
      <Grid className="unit-filters__options">
        <FilterOptionsRow filterName={filter.name} className="unit-filters__options" options={filter.options} onSelect={this.onMenuSelect}/>
        {filter.secondaryOptions && <Row componentClass="hr" className="unit-filters__options-separator"/>}
        {filter.secondaryOptions &&
          <FilterOptionsRow className="unit-filters__options secondary" filterName={filter.name} options={filter.secondaryOptions}
                              onSelect={this.onMenuSelect}/>
        }
      </Grid>
    );

    return (
      <div className="unit-filters">
        <Grid className="unit-filters__filters">
          <Row className="unit-filters__filters">
            {filters.map((filter, index) => (
              <Col className="unit-filters__edit" xs={6} key={filter.name}>
                <UnitFilterButton
                  t={t}
                  filterName={filter.active}
                  className={expand === index ? 'active' : ''}
                  onClick={() => this.setState(({expand}) => ({expand: expand === index ? null : index}))}
                />
              </Col>
            ))}
          </Row>
        </Grid>
        {
          expand !== null ? <FilterOptions filter={filters[expand]}/> : null
        }
      </div>
    );
  }

}

export default translate()(UnitFilters2);
