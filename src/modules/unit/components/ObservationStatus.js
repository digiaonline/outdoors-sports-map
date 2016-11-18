import React from 'react';
import {translate} from 'react-i18next';
import moment from 'moment';
import Time from '../../home/components/Time';
import {getUnitQuality, getObservation, getAttr} from '../helpers';

export const StatusBar = ({quality, label}) =>
  <div className={`observation-status__bar--${quality}`}>
    {label}
  </div>;

export const StatusUpdated = translate()(({time, t}) =>
  <div className="obervation-status__time"  style={{fontSize: 12}}>
    {t('UNIT.UPDATED')} <Time time={time}/>
  </div>
);

export const MaintenanceUpdated = ({text, time}) =>
  <div className="observation-status__time"  style={{fontSize: 12}}>
    {text} <Time time={time}/>
  </div>;

const getObservationTime = (observation: Object) =>
  moment(observation && observation.time || 0).toDate();

export const ObservationStatus = ({unit, t}, context) => {
  const quality = getUnitQuality(unit);
  const condition = getObservation(unit);
  const maintenance = getObservation(unit, 'maintenance');

  return (
    <div className="observation-status">
      <StatusBar quality={quality} label={condition && condition.name ? getAttr(condition.name, context.getActiveLanguage()) : t('UNIT.UNKNOWN')}/>
      <StatusUpdated time={getObservationTime(condition)}/>
      {
        maintenance &&
        <MaintenanceUpdated text={getAttr(maintenance.name, context.getActiveLanguage())} time={getObservationTime(maintenance)}/>
      }
    </div>
  );
};

ObservationStatus.contextTypes = {
  getActiveLanguage: React.PropTypes.func
};

export default translate()(ObservationStatus);
