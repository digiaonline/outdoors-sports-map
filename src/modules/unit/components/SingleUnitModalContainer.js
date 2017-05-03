//@flow
import React, {Component} from 'react';
import {Modal} from 'react-bootstrap';
import ReactMarkdown from 'react-markdown';
import SMIcon from '../../home/components/SMIcon';
import {
  getAttr,
  getObservation,
  getOpeningHours,
  getObservationTime
} from '../helpers';
import {getServiceName} from '../../service/helpers';
import {translate} from 'react-i18next';
import ObservationStatus, {StatusUpdated} from './ObservationStatus';
import UnitIcon from './UnitIcon';
import upperFirst from 'lodash/upperFirst';
import get from 'lodash/get';

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
    {get(unit, 'extensions.length') && <p>{t('MODAL.LENGTH') + ': '}<strong>{unit.extensions.length}km</strong></p>}
    {get(unit, 'extensions.lighting') && <p>{t('MODAL.LIGHTING') + ': '}<strong>{upperFirst(getAttr(unit.extensions.lighting, activeLang()))}</strong></p>}
    {get(unit, 'extensions.skiing_technique') && <p>{t('MODAL.SKIING_TECHNIQUE') + ': '}<strong>{upperFirst(getAttr(unit.extensions.skiing_technique, activeLang()))}</strong></p>}
    {unit.phone && <p>{t('UNIT.PHONE')}: <a href={`tel:${unit.phone}`}>{unit.phone}</a></p>}
    {unit.www_url && <p><a href={getAttr(unit.www_url, activeLang())} target="_blank">{t('UNIT.FURTHER_INFO')} <SMIcon icon="outbound-link"/></a></p>}
  </ModalBodyBox>;

/**
 * [NoticeInfo description]
 * @param {Object} unit       [description]
 * @param {Function} t          [description]
 * @param {Function} activeLang [description]
 */
const NoticeInfo = ({unit, t, activeLang}) => {
  const notice = getObservation(unit, 'notice');
  return ( notice ?
  <ModalBodyBox title={t('MODAL.NOTICE')}>
    <StatusUpdated time={getObservationTime(notice)} t={t}/>
    <ReactMarkdown
      source={getAttr(notice.value, activeLang())}
      softBreak="br"
      escapeHtml
      allowedTypes={['Text', 'Paragraph', 'Softbreak']}
    />
  </ModalBodyBox>
  :
  null
  );
};

const LocationRoute = ({routeUrl, t}) =>
    <ModalBodyBox title={t('MODAL.ROUTE_HERE')}>
      <a target="_blank" href={routeUrl}>
        {t('MODAL.GET_ROUTE')}
      </a>
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

const LocationTemperature = ({t, temperature}) =>
  <ModalBodyBox title={t('MODAL.TEMPERATURE')}>
    {temperature}
  </ModalBodyBox>;

const ModalBodyBox = ({title, children, className, ...rest}) =>
  <div className={`${className || ''} modal-body-box`} {...rest}>
    {title && <div className="modal-body-box-headline">{title}</div>}
    {children}
  </div>;

export class SingleUnitModalContainer extends Component {

  constructor(props) {
    super(props);
  }

  shouldShowInfo(unit) {
    const hasExtensions = unit.extensions && (unit.extensions.length || unit.extensions.lighting || unit.extensions.skiing_technique);
    return hasExtensions || unit.phone || unit.www_url;
  }

  shouldShowRoute(unit) {
    return unit.connections && (unit.connections.filter((connection) => connection.section === 'traffic')[0]);
  }

  getRouteUrl(unit, activeLang) {
    const trafficObject = unit.connections.filter((connection) => connection.section === 'traffic')[0];
    return getAttr(trafficObject.www_url, activeLang());
  }

  render(){
    const {handleClick, isLoading, unit: currentUnit, services, t} = this.props;
    const {getActiveLanguage} = this.context;
    let temperature = null;
    if (currentUnit) {
      temperature = currentUnit.observations.find((o) => { return o.property == 'swimming_water_temperature'; });
    }
    if (temperature) { temperature = temperature.name.fi; }

    return (
      <div>
        <Modal className="single-unit-modal" show={this.props.isOpen} backdrop={false} animation={false}>
          <ModalHeader unit={currentUnit} services={services} handleClick={handleClick} isLoading={isLoading} t={t} activeLang={getActiveLanguage}/>
          {currentUnit && !isLoading ?
            <Modal.Body>
              <LocationState unit={currentUnit} t={t}/>
              <NoticeInfo unit={currentUnit} t={t} activeLang={getActiveLanguage}/>
              {temperature && <LocationTemperature t={t} temperature={temperature}/>}
              {this.shouldShowInfo(currentUnit) && <LocationInfo unit={currentUnit} t={t} activeLang={getActiveLanguage}/>}
              {getOpeningHours(currentUnit) && <LocationOpeningHours unit={currentUnit} t={t} activeLang={getActiveLanguage}/>}
              {this.shouldShowRoute(currentUnit) && <LocationRoute t={t} routeUrl={this.getRouteUrl(currentUnit, getActiveLanguage)} />}
            </Modal.Body>
            : null
          }
        </Modal>
      </div>
    );
  }
}

SingleUnitModalContainer.contextTypes = {
  getActiveLanguage: React.PropTypes.func,
};

export default translate()(SingleUnitModalContainer);