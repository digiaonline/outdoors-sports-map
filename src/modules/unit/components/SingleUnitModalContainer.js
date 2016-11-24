import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import SMIcon from '../../home/components/SMIcon';
import {getServiceName, getAttr} from '../helpers.js';
import {translate} from 'react-i18next';
import ObservationStatus from './ObservationStatus';
import UnitIcon from './UnitIcon';

const ModalHeader = ({handleClick, unit, t}, context) => {
  const unitAddress = getAttr(unit.street_address, context.getActiveLanguage());
  const unitZIP = unit.address_zip;

  return(
    <Modal.Header>
      <div>
        <div className="modal-header-name">
          <div>
            <h4>{unit ? getAttr(unit.name, context.getActiveLanguage()) : t('MODAL.LOADING')}</h4>
          </div>
          <div style={{alignSelf: 'center'}}>
            <a className="close-unit-modal" onClick={handleClick}><SMIcon icon="close"/></a>
          </div>
        </div>
        {unit
          ? <div className="modal-header-description">
              <UnitIcon unit={unit} alt={getServiceName(unit)}/>
              <div>
                <p>
                {
                  getServiceName(unit, context.getActiveLanguage())
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

ModalHeader.contextTypes = {
  getActiveLanguage: React.PropTypes.func
};


const LocationState = ({unit, t}) =>
  <div className="modal-body-box">
    <div className="modal-body-box-headline">{t('MODAL.QUALITY')}</div>
    <ObservationStatus unit={unit}/>
  </div>;

const LocationInfo = ({t}) =>
  <div className="modal-body-box">
    <div className="modal-body-box-headline">{t('MODAL.INFO')}</div>
    Such info
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

export class SingleUnitModalContainer extends Component {

  constructor(props) {
    super(props);
    this.getCurrentUnit = this.getCurrentUnit.bind(this);
  }

  getCurrentUnit(units, currentUnitId) {
    return units.filter((unit) => unit.id == currentUnitId)[0];
  }

  render(){
    const {units, handleClick, params, t} = this.props;
    const currentUnit = units ? this.getCurrentUnit(units, params.unitId) : null;

    return (
      <div>
        <Modal className="single-unit-modal" show={this.props.isOpen} backdrop={false}>
          <ModalHeader unit={currentUnit} handleClick={handleClick} t={t}/>
          {currentUnit ?
            <Modal.Body>
              <LocationState unit={currentUnit} t={t}/>
              <LocationInfo t={t}/>
              <LocationWeather t={t}/>
              <LocationHeightProfile t={t}/>
            </Modal.Body>
            : null
          }
        </Modal>
      </div>
    );
  }
}

export default translate()(SingleUnitModalContainer);
