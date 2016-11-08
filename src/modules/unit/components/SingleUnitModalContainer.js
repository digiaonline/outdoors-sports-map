import React, {Component} from 'react';
import {Modal, Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router';
import {getAttr} from '../helpers.js';
import {translate} from 'react-i18next';

const ModalHeader = ({handleClick, name, address, zip}) =>
  <Modal.Header>
    <div>
      <h3>
        {name}
        <Link to="/">
          <Glyphicon onClick={handleClick} style={{ position: 'relative', float: 'right' }} glyph="remove"/>
        </Link>
      </h3>
      <p>{address}</p>
    </div>
  </Modal.Header>;

const LocationState = () =>
  <div className="single-unit-modal__box">
    Kunnossa o
  </div>;

const LocationInfo = () =>
  <div className="single-unit-modal__box">
    Such info
  </div>;

const LocationWeather = () =>
  <div className="single-unit-modal__box">
    Wow such weather.
  </div>;

const LocationHeightProfile = () =>
  <div className="single-unit-modal__box">
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
    const currentUnit = this.getCurrentUnit(units, params.unitId);
    const currentUnitName = currentUnit ? getAttr(currentUnit.name) : t('MODAL.LOADING');
    const currentUnitAddress = currentUnit ? getAttr(currentUnit.street_address)+', '+currentUnit.address_zip : null;
    console.log(currentUnit);

    return (
      <div>
        <Modal className="single-unit-modal" show={this.props.isOpen} backdrop={false}>
          <ModalHeader name={currentUnitName} address={currentUnitAddress} handleClick={handleClick}/>
            {currentUnit ?
              <Modal.Body>
                <LocationState/>
                <LocationInfo/>
                <LocationWeather/>
                <LocationHeightProfile/>
              </Modal.Body>
              : null
            }
        </Modal>
      </div>
    );
  }
}

export default translate()(SingleUnitModalContainer);
