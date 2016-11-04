import React, {Component} from 'react';
import {Modal, Glyphicon} from 'react-bootstrap';
import {Link} from 'react-router';
import {getAttr} from '../helpers.js';

const ModalHeader = ({handleClick, name, address, zip}) =>
  <Modal.Header>
    <div>
      <h3>
        {name}
        <Link to="/">
          <Glyphicon onClick={handleClick} style={{ position: 'relative', float: 'right' }} glyph="remove"/>
        </Link>
      </h3>
      <p>{address}, {zip}</p>
    </div>
  </Modal.Header>;

const LocationState = () =>
  <div>
    Kunnossa on
  </div>;

const LocationInfo = () =>
  <div>
    Such info
  </div>;

const LocationWeather = () =>
  <div>
    Wow such weather.
  </div>;

const LocationHeightProfile = () =>
  <div>
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
    const {units, handleClick, params} = this.props;
    const currentUnit = this.getCurrentUnit(units, params.unitId);
    const currentUnitName = currentUnit ? getAttr(currentUnit.name) : 'Name was not found :(';
    const currentUnitAddress = currentUnit ? getAttr(currentUnit.street_address) : 'Address was not found :(';
    const currentUnitZip = currentUnit ? currentUnit.address_zip : 'Zip was not found :(';
    console.log(currentUnit);

    return (
      <div>
        <Modal className="single-unit-modal" show={this.props.isOpen}>
          <ModalHeader name={currentUnitName} address={currentUnitAddress} zip={currentUnitZip} handleClick={handleClick}/>
          <Modal.Body>
            <LocationState/>
            <LocationInfo/>
            <LocationWeather/>
            <LocationHeightProfile/>
          </Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default SingleUnitModalContainer;
