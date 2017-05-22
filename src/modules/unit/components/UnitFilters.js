//@flow
import React from 'react';
import {translate} from 'react-i18next';
import {Grid, Row, Col} from 'react-bootstrap';
import UnitFilterButton from './UnitFilterButton';


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

export class UnitFiltersComponent extends React.Component {
  props: UnitFiltersProps;

  state: {
    expand: number | null
  };

  onMenuSelect = (key: string, value: string): void => {
    this.setState(
      () => ({expand: null}));
    this.props.updateFilter(key, value);
  }

  state = {
    expand: null,
  }

  render() {
    const {filters, t} = this.props;
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

export default translate()(UnitFiltersComponent);