import React from 'react';
import {Link} from 'react-router';
import ObservationStatus from '../../unit/components/ObservationStatus';
import {SMIcon} from '../../home/components/SMIcon';
import {getServiceName, getAttr} from '../../unit/helpers';

const AddressSuggestion = ({address, handleClick, ...rest}, context) =>
  <Link className="search-suggestions__result" onClick={() => handleClick(address.geometry.coordinates.slice().reverse())}>
    <div className="search-suggestions__address-icon">
      <img src={require('../../../../assets/markers/unknown-satisfactory-off.png')} height="21px" />
    </div>
    <div className="search-suggestions__result-details">
      <div className="search-suggestions__result-details__name">{address.properties.label}</div>
    </div>
  </Link>;

AddressSuggestion.contextTypes = {
  getActiveLanguage: React.PropTypes.func,
};

export default AddressSuggestion;