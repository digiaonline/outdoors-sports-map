import React, {Component} from 'react';
import L from 'leaflet';
//import {getUnitGeometry} from '../helpers';
import UnitMarker from './UnitMarker';
import UnitGeometry from './UnitGeometry';

export class SingleUnitOnMap extends Component{

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    const {unit, openUnit} = this.props;
    L.DomEvent.stopPropagation(e);

    openUnit(unit.id);
  }

  render () {
    const {unit, isSelected, ...rest} = this.props;
    const geometry = unit.geometry;

    return(
      <div>
      <UnitMarker unit={unit} isSelected={isSelected} handleClick={this.handleClick} {...rest}/>
      {geometry && <UnitGeometry unit={unit} onClick={this.handleClick} isSelected={isSelected}/> }
      </div>
    );
  }
}

export default SingleUnitOnMap;
