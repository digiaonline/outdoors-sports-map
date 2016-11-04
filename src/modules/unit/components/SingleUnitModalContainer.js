import React, {Component} from 'react';
import {Modal, Button, Glyphicon} from 'react-bootstrap';

export class SingleUnitModalContainer extends Component {

  constructor(props) {
    super(props);
    this.state ={modalOpen: false};
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    if (this.state.modalOpen === false) {
      this.setState({modalOpen: true});
    } else {
      this.setState({modalOpen: false});
    }
  }

  render(){


    return (
      <div>
        <Button onClick={this.toggleOpen} style={{ position: 'fixed', bottom: 30, right: 0, zIndex: 10000 }}>Wryy</Button>
        <Modal className="single-unit-modal" show={this.state.modalOpen}>
          <Modal.Header><Glyphicon onClick={this.toggleOpen} style={{ float: 'right' }} glyph="remove"/>Wryy</Modal.Header>
          <Modal.Body>Moi</Modal.Body>
        </Modal>
      </div>
    );
  }
}

export default SingleUnitModalContainer;
