import React, {Component} from 'react';
import {Modal, Button, Glyphicon} from 'react-bootstrap';
import {connect} from 'react-redux';
import withRouter from 'react-router';
import {getAttr} from '../helpers.js';

const ModalHeader = ({handleClick, name, address, zip}) =>
  <Modal.Header>
    <div>
      <h3>
        {name}
        <Glyphicon onClick={handleClick} style={{ position: 'relative', float: 'right' }} glyph="remove"/>
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
    this.state ={modalOpen: false};
    this.toggleOpen = this.toggleOpen.bind(this);
    this.getCurrentUnit = this.getCurrentUnit.bind(this);
  }

  toggleOpen() {
    if (this.state.modalOpen === false) {
      this.setState({modalOpen: true});
    } else {
      this.setState({modalOpen: false});
    }
  }

  getCurrentUnit(units, currentUnitId) {
    return units.filter((unit) => unit.id == currentUnitId)[0];
  }

  render(){
    const {units, params} = this.props;
    const currentUnitId = params.unitId;
    const currentUnit = this.getCurrentUnit(units, currentUnitId);
    const currentUnitName = currentUnit ? getAttr(currentUnit.name) : 'Name was not found :(';
    const currentUnitAddress = currentUnit ? getAttr(currentUnit.street_address) : 'Address was not found :(';
    const currentUnitZip = currentUnit ? currentUnit.address_zip : 'Zip was not found :(';
    console.log(currentUnit);

    return (
      <div>
        <Button onClick={this.toggleOpen} style={{ position: 'fixed', bottom: 30, right: 0, zIndex: 10000 }}>Wryy</Button>
        <Modal className="single-unit-modal" show={this.state.modalOpen}>
          <ModalHeader name={currentUnitName} address={currentUnitAddress} zip={currentUnitZip} handleClick={this.toggleOpen}/>
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

const mapStateToProps = (state, routerProps) => ({
  unitId: routerProps
});

export default connect(mapStateToProps)(SingleUnitModalContainer);
