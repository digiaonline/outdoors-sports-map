import React from 'react';
import {translate} from 'react-i18next';
import Time from '../../home/components/Time';
import {getUnitQuality, getObservation, getCondition, getObservationTime, getAttr} from '../helpers';

export const StatusBar = ({quality, label}) =>
  <div className={`observation-status__bar--${quality}`}>
    {label}
  </div>;

export const StatusUpdated = ({time, t}) =>
  <div className="obervation-status__time"  style={{fontSize: 12}}>
    {t('UNIT.UPDATED')} <Time time={time}/>
  </div>;

export const MaintenanceUpdated = ({name, activeLang, time}) =>
  <div className="observation-status__time"  style={{fontSize: 12}}>
    {getAttr(name, activeLang())} <Time time={time}/>
  </div>;


export const ObservationStatus = ({unit, t}, context) => {
  const quality = getUnitQuality(unit);
  const condition = getCondition(unit);
  const maintenance = getObservation(unit, 'maintenance');

  return (
    <div className="observation-status">
      <StatusBar quality={quality} label={condition && condition.name ? getAttr(condition.name, context.getActiveLanguage()) : t('UNIT.UNKNOWN')}/>
      <StatusUpdated t={t} time={getObservationTime(condition)}/>
      {
        maintenance &&
        <MaintenanceUpdated name={maintenance.name} activeLang={context.getActiveLanguage} time={getObservationTime(maintenance)}/>
      }
    </div>
  );
};

ObservationStatus.contextTypes = {
  getActiveLanguage: React.PropTypes.func,
};

export default translate()(ObservationStatus);