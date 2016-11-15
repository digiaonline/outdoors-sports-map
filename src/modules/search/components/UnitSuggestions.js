import React from 'react';
import {Link} from 'react-router';
import ObservationStatus from '../../unit/components/ObservationStatus';
import {getUnitIconURL, getServiceName, getObservation} from '../../unit/helpers';

const UnitSuggestion = ({unit, ...rest}, context) =>
  <Link to={`/unit/${unit.id}`} className="search-suggestions__result" {...rest}>
    <div className="search-suggestions__result-icon">
      <img src={getUnitIconURL(unit)} alt={getServiceName(unit)} />
    </div>
    <div className="search-suggestions__result-details">
      <div className="search-suggestions__result-details__name">{context.getAttr(unit.name)}</div>
      <ObservationStatus observation={getObservation(unit)}/>
    </div>
  </Link>;

UnitSuggestion.contextTypes = {
  getAttr: React.PropTypes.func
};

export default UnitSuggestion;
