import React from 'react';
import {Link} from 'react-router';
import ObservationStatus from '../../unit/components/ObservationStatus';
import {getAttr, getUnitIconURL, getServiceName, getObservation} from '../../unit/helpers';

const UnitSuggestion = ({unit, ...rest}) =>
  <Link to={`/unit/${unit.id}`} className="search-suggestions__result" {...rest}>
    <div className="search-suggestions__result-icon">
      <img src={getUnitIconURL(unit)} alt={getServiceName(unit)} />
    </div>
    <div className="search-suggestions__result-details">
      <div className="search-suggestions__result-details__name">{getAttr(unit.name)}</div>
      <ObservationStatus observation={getObservation(unit)}/>
    </div>
  </Link>;

export default UnitSuggestion;
