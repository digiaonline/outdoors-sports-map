import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import SMIcon from '../../home/components/SMIcon';
import {getServiceName, getAttr, getOpeningHours} from '../helpers.js';
import {translate} from 'react-i18next';
import ObservationStatus from './ObservationStatus';
import UnitIcon from './UnitIcon';
import upperFirst from 'lodash/upperFirst';

const ModalHeader = ({handleClick, unit, isLoading, activeLang, t}) => {
  const unitAddress = unit ? getAttr(unit.street_address, activeLang()) : null;
  const unitZIP = unit ? unit.address_zip : null;

  return(
    <Modal.Header>
      <div>
        <div className="modal-header-name">
          <div>
            {isLoading
              ? <h4>{t('MODAL.LOADING')}</h4>
              : <h4>{unit ? getAttr(unit.name, activeLang()) : t('MODAL.NOT_FOUND')}</h4>
            }
          </div>
          <div style={{alignSelf: 'center'}}>
            <a className="modal-close-button close-unit-modal" onClick={handleClick}><SMIcon icon="close"/></a>
          </div>
        </div>
        {unit
          ? <div className="modal-header-description">
              <UnitIcon unit={unit} alt={getServiceName(unit)}/>
              <div>
                <p>
                {
                  getServiceName(unit, activeLang())
                }
                </p>
                <p>
                {unitAddress ? `${unitAddress}, ` : ''}
                {unitZIP || ''}
                </p>
              </div>
            </div>
          : null
        }
      </div>
    </Modal.Header>
  );
};

const LocationState = ({unit, t}) =>
  <div className="modal-body-box">
    <div className="modal-body-box-headline">{t('MODAL.QUALITY')}</div>
    <ObservationStatus unit={unit}/>
  </div>;

const LocationInfo = ({unit, t, activeLang}) =>
  <div className="modal-body-box">
    <div className="modal-body-box-headline">{t('MODAL.INFO')}</div>
    {unit.extensions.length && <p>{t('MODAL.LENGTH') + ': '}<strong>{unit.extensions.length}km</strong></p>}
    {unit.extensions.lighting && <p>{t('MODAL.LIGHTING') + ': '}<strong>{upperFirst(getAttr(unit.extensions.lighting, activeLang()))}</strong></p>}
    {unit.extensions.skiing_technique && <p>{t('MODAL.SKIING_TECHNIQUE') + ': '}<strong>{upperFirst(getAttr(unit.extensions.skiing_technique, activeLang()))}</strong></p>}
    </div>;

const LocationWeather = ({t}) =>
  <div className="modal-body-box">
    <div className="modal-body-box-headline">{t('MODAL.WEATHER')}</div>
    Wow such weather.
  </div>;

const LocationHeightProfile = ({t}) =>
  <div className="modal-body-box">
    <div className="modal-body-box-headline">{t('MODAL.HEIGHT_PROFILE')}</div>
    Wow such profile.
  </div>;

const LocationOpeningHours = ({unit, t, activeLang}) =>
  <div className="modal-body-box">
    <div className="modal-body-box-headline">{t('MODAL.OPENING_HOURS')}</div>
    {getOpeningHours(unit, activeLang())}
  </div>;

export class SingleUnitModalContainer extends Component {

  constructor(props) {
    super(props);
    this.getCurrentUnit = this.getCurrentUnit.bind(this);
  }

  getCurrentUnit(units, currentUnitId) {
    return units.filter((unit) => unit.id == currentUnitId)[0];
  }

  render(){
    const {units, handleClick, params, isLoading, t} = this.props;
    const {getActiveLanguage} = this.context;
    const currentUnit = units ? this.getCurrentUnit(units, params.unitId) : null;

    return (
      <div>
        <Modal className="single-unit-modal" show={this.props.isOpen} backdrop={false} animation={false}>
          <ModalHeader unit={currentUnit} handleClick={handleClick} isLoading={isLoading} t={t} activeLang={getActiveLanguage}/>
          {currentUnit && !isLoading ?
            <Modal.Body>
              <LocationState unit={currentUnit} t={t}/>
              {currentUnit.extensions
                && (currentUnit.extensions.length || currentUnit.extensions.lighting || currentUnit.extensions.skiing_technique)
                && <LocationInfo unit={currentUnit} t={t} activeLang={getActiveLanguage}/>}
              {getOpeningHours(currentUnit) && <LocationOpeningHours unit={currentUnit} t={t} activeLang={getActiveLanguage}/>}
            </Modal.Body>
            : null
          }
        </Modal>
      </div>
    );
  }
}

SingleUnitModalContainer.contextTypes = {
  getActiveLanguage: React.PropTypes.func
};

export default translate()(SingleUnitModalContainer);
