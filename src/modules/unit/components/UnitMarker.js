import React, {Component} from 'react';
import {Marker} from 'react-leaflet';
import {Icon} from 'leaflet';
import {getUnitIcon, getUnitPosition, getUnitSport} from '../helpers';
import {UNIT_ICON_WIDTH, UnitFilters} from '../constants';
import UnitPopup from './UnitPopup';

const POPUP_OFFSET = 4;

class UnitMarker extends Component {
  constructor(props) {
    super(props);

    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
  }

  openPopup() {
    this.refs.marker.leafletElement.openPopup();
  }

  closePopup() {
    this.refs.marker.leafletElement.closePopup();
  }

  _createIcon(unit: Object, isSelected: boolean) {
    const icon = getUnitIcon(unit, isSelected);
    const anchorHeight = this._getAnchorHeight(unit);

    return new Icon({
      iconUrl: icon.url,
      iconRetinaUrl: icon.retinaUrl,
      iconSize: [UNIT_ICON_WIDTH, icon.height],
      iconAnchor: [UNIT_ICON_WIDTH / 2, anchorHeight]
    });
  }

  _getAnchorHeight(unit) {
    const iconHeight = getUnitIcon(unit).height;
    return getUnitSport(unit) === UnitFilters.SKIING ? iconHeight / 2 : iconHeight;
  }

  _getPopupOffset(unit) {
    return -(getUnitSport(unit) === UnitFilters.SKIING ? POPUP_OFFSET : POPUP_OFFSET + 24);
  }

  render() {
    const {unit, isSelected, handleClick, ...rest} = this.props;
    return (
      <Marker
        ref="marker"
        position={getUnitPosition(unit)}
        icon={this._createIcon(unit, isSelected)}
        onClick={handleClick}
        onMouseOver={this.openPopup}
        onMouseOut={this.closePopup}
        {...rest}>
        <UnitPopup unit={unit} offset={this._getPopupOffset(unit)}/>
      </Marker>
    );
  }
}

export default UnitMarker;
