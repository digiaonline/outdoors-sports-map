import React, {PropTypes} from 'react';
import {Link} from 'react-router';
import ObservationStatus from '../../unit/components/ObservationStatus';
import {getAttr} from '../../unit/helpers';
import {getServiceName} from '../../service/helpers';
import UnitIcon from '../../unit/components/UnitIcon';

const UnitSuggestion = ({unit, handleClick, services, ...rest}, context) =>
  <Link to={`/unit/${unit.id}`} onClick={(e) => {e.preventDefault(); handleClick();}} className="search-suggestions__result" {...rest}>
    <div className="search-suggestions__result-icon">
      <UnitIcon unit={unit} alt={getServiceName(unit.services[0], services, context.getActiveLanguage())} />
    </div>
    <div className="search-suggestions__result-details">
      <div className="search-suggestions__result-details__name">{getAttr(unit.name, context.getActiveLanguage())}</div>
      <ObservationStatus unit={unit}/>
    </div>
  </Link>;

UnitSuggestion.contextTypes = {
  getActiveLanguage: React.PropTypes.func
};

UnitSuggestion.propTypes = {
  unit: PropTypes.object.isRequired,
  handleClick: PropTypes.func,
  services: PropTypes.object.isRequired
};

export default UnitSuggestion;
