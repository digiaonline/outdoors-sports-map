import React, {Component} from 'react';
import {Marker} from 'react-leaflet';
import {Icon} from 'leaflet';
import {getUnitIconURL, getUnitPosition, getUnitSport} from '../helpers';
import {UnitFilters} from '../constants';
import UnitPopup from './UnitPopup';

const POINTER_ICON_HEIGHT = 36;
const HANDLE_ICON_HEIGHT = 30;
const ICON_WIDTH = 30;
const POPUP_OFFSET = 4;

// TODO: Use only getUnitPosition when ski tracks
// have correct locations in backend.
const temporarilyGetUnitPosition = (unit: Object) => {
  if (!unit.geometry || !unit.geometry.coordinates) {
    return getUnitPosition(unit);
  }
  return unit.geometry.coordinates[0][0].slice().reverse();

};

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
    const iconHeight = this._getIconHeight(unit);
    const anchorHeight = this._getAnchorHeight(unit);

    return new Icon({
      iconUrl: getUnitIconURL(unit, isSelected, false),
      iconRetinaUrl: getUnitIconURL(unit, isSelected),
      iconSize: [ICON_WIDTH, iconHeight],
      iconAnchor: [ICON_WIDTH / 2, anchorHeight]
    });
  }

  _getIconHeight(unit: Object) {
    return getUnitSport(unit) === UnitFilters.SKIING ? HANDLE_ICON_HEIGHT : POINTER_ICON_HEIGHT;
  }

  _getAnchorHeight(unit: Objcect) {
    return getUnitSport(unit) === UnitFilters.SKIING ? HANDLE_ICON_HEIGHT / 2 : POINTER_ICON_HEIGHT;
  }

  _getPopupOffset(unit) {
    return -(getUnitSport(unit) === UnitFilters.SKIING ? POPUP_OFFSET : POPUP_OFFSET + 24);
  }

  render() {
    const {unit, isSelected, handleClick, ...rest} = this.props;
    const {getActiveLanguage: getLang} = this.context;

    return (
      <Marker
        ref="marker"
        position={temporarilyGetUnitPosition(unit)}
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
