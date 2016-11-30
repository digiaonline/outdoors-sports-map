import React from 'react';
import {Link} from 'react-router';
import ObservationStatus from '../../unit/components/ObservationStatus';
import {SMIcon} from '../../home/components/SMIcon';
import {getServiceName, getAttr} from '../../unit/helpers';

const AddressSuggestion = ({address, ...rest}, context) =>
  <Link className="search-suggestions__result" onClick={() => console.log('Wryyyyy')}>
    <div className="search-suggestions__address-icon" style={{width: 37}}>
      <img src={require('../../../../assets/markers/unknown-satisfactory-off.png')} height="21px" />
    </div>
    <div className="search-suggestions__result-details">
      <div className="search-suggestions__result-details__name">{address.properties.label}</div>
    </div>
  </Link>;

AddressSuggestion.contextTypes = {
  getActiveLanguage: React.PropTypes.func
};

export default AddressSuggestion;
