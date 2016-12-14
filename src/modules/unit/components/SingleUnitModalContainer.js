import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import SMIcon from '../../home/components/SMIcon';
import {getAttr, getOpeningHours} from '../helpers';
import {getServiceName} from '../../service/helpers';
import {translate} from 'react-i18next';
import ObservationStatus from './ObservationStatus';
import UnitIcon from './UnitIcon';
import upperFirst from 'lodash/upperFirst';

const ModalHeader = ({handleClick, unit, services, isLoading, activeLang, t}) => {
  const unitAddress = unit ? getAttr(unit.street_address, activeLang()) : null;
  const unitZIP = unit ? unit.address_zip : null;
  const unitMunicipality = unit ? unit.municipality : null;

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
              <UnitIcon unit={unit} alt={getServiceName(unit.services[0], services, activeLang())}/>
              <div>
                <p>
                {
                  getServiceName(unit.services[0], services, activeLang())
                }
                </p>
                <p>
                {unitAddress ? `${unitAddress}, ` : ''}
                {unitZIP ? `${unitZIP} ` : ''}
                <span style={{textTransform: 'capitalize'}}>{unitMunicipality || ''}</span>
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
  <ModalBodyBox title={t('MODAL.QUALITY')}>
    <ObservationStatus unit={unit}/>
  </ModalBodyBox>;

const LocationInfo = ({unit, t, activeLang}) =>
  <ModalBodyBox title={t('MODAL.INFO')}>
    {unit.extensions.length && <p>{t('MODAL.LENGTH') + ': '}<strong>{unit.extensions.length}km</strong></p>}
    {unit.extensions.lighting && <p>{t('MODAL.LIGHTING') + ': '}<strong>{upperFirst(getAttr(unit.extensions.lighting, activeLang()))}</strong></p>}
    {unit.extensions.skiing_technique && <p>{t('MODAL.SKIING_TECHNIQUE') + ': '}<strong>{upperFirst(getAttr(unit.extensions.skiing_technique, activeLang()))}</strong></p>}
  </ModalBodyBox>;

const LocationWeather = ({t}) =>
  <ModalBodyBox title={t('MODAL.WEATHER')}>
    Wow such weather.
  </ModalBodyBox>;

const LocationHeightProfile = ({t}) =>
  <ModalBodyBox title={t('MODAL.HEIGHT_PROFILE')}>
    Wow such profile.
  </ModalBodyBox>;

const LocationOpeningHours = ({unit, t, activeLang}) =>
  <ModalBodyBox title={t('MODAL.OPENING_HOURS')}>
    {getOpeningHours(unit, activeLang())}
  </ModalBodyBox>;

const LocationPhoneNumber = ({phone, t}) =>
  <ModalBodyBox title={t('UNIT.PHONE')}>
    <a href={`tel:${phone}`}>{phone}</a>
  </ModalBodyBox>;

const ModalBodyBox = ({title, children, className, ...rest}) =>
  <div className={`${className} modal-body-box`} {...rest}>
    {title && <div className="modal-body-box-headline">{title}</div>}
    {children}
  </div>;

export class SingleUnitModalContainer extends Component {

  constructor(props) {
    super(props);
  }

  render(){
    const {handleClick, isLoading, unit: currentUnit, services, t} = this.props;
    const {getActiveLanguage} = this.context;

    return (
      <div>
        <Modal className="single-unit-modal" show={this.props.isOpen} backdrop={false} animation={false}>
          <ModalHeader unit={currentUnit} services={services} handleClick={handleClick} isLoading={isLoading} t={t} activeLang={getActiveLanguage}/>
          {currentUnit && !isLoading ?
            <Modal.Body>
              <LocationState unit={currentUnit} t={t}/>
              {currentUnit.extensions
                && (currentUnit.extensions.length || currentUnit.extensions.lighting || currentUnit.extensions.skiing_technique)
                && <LocationInfo unit={currentUnit} t={t} activeLang={getActiveLanguage}/>}
              {getOpeningHours(currentUnit) && <LocationOpeningHours unit={currentUnit} t={t} activeLang={getActiveLanguage}/>}
              {currentUnit.phone && <LocationPhoneNumber phone={currentUnit.phone} t={t}/>}
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
