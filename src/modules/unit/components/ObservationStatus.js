import React from 'react';
import {translate} from 'react-i18next';
import moment from 'moment';
import Time from '../../home/components/Time';
import {getUnitQuality, getObservation} from '../helpers';

export const StatusBar = ({quality, label}) =>
  <div className={`observation-status__bar--${quality}`}>
    {label}
  </div>;

export const StatusUpdated = translate()(({time, t}) =>
  <div className="obervation-status__time">
    {t('UNIT.UPDATED')} <Time time={time}/>
  </div>
);

export const MaintenanceUpdated = translate()(({time, t}) =>
  <div className="observation-status__time">
    {t('UNIT.MAINTENANCE_DONE')} <Time time={time}/>
  </div>
);

const getObservationTime = (observation: Object) =>
  moment(observation && observation.time || 0).toDate();

export const ObservationStatus = ({unit, t}, context) => {
  const {getAttr} = context;
  const quality = getUnitQuality(unit);
  const condition = getObservation(unit);
  const maintenance = getObservation(unit, 'maintenance');

  return (
    <div className="observation-status">
      <StatusBar quality={quality} label={condition && condition.name ? getAttr(condition.name) : t('UNIT.UNKNOWN')}/>
      <StatusUpdated time={getObservationTime(condition)}/>
      {
        maintenance &&
        <MaintenanceUpdated time={getObservationTime(maintenance)}/>
      }
    </div>
  );
};

ObservationStatus.contextTypes = {
  getAttr: React.PropTypes.func
};


export default translate()(ObservationStatus);
