import React, {Component} from 'react';
import {Marker} from 'react-leaflet';
import {Icon} from 'leaflet';
import {getUnitIcon, getUnitPosition, getUnitSport} from '../helpers';
import {UNIT_ICON_WIDTH, UnitFilters} from '../constants';
import {MAX_ZOOM} from '../../map/constants';
import UnitPopup from './UnitPopup';

const POPUP_OFFSET = 4;

class UnitMarker extends Component {
  constructor(props) {
    super(props);

    this.openPopup = this.openPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.getIconWidth = this.getIconWidth.bind(this);
    this.getIconHeight = this.getIconHeight.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    const {isSelected} = this.props;
    if(!isSelected && nextProps.isSelected) {
      this.closePopup();
    }
  }

  openPopup() {
    this.refs.marker.leafletElement.openPopup();
  }

  closePopup() {
    this.refs.marker.leafletElement.closePopup();
  }

  getIconWidth(zoomLevel) {
    return zoomLevel / MAX_ZOOM * UNIT_ICON_WIDTH;
  }

  getIconHeight(icon, zoomLevel) {
    return zoomLevel / MAX_ZOOM * icon.height;
  }

  _createIcon(unit, isSelected) {
    const icon = getUnitIcon(unit, isSelected);
    const iconWidth = this.getIconWidth(this.props.zoomLevel);
    const iconHeight = this.getIconHeight(icon, this.props.zoomLevel);
    const anchorHeight = this._getAnchorHeight(iconHeight, unit);

    return new Icon({
      iconUrl: icon.url,
      iconRetinaUrl: icon.retinaUrl,
      iconSize: [iconWidth, iconHeight],
      iconAnchor: [iconWidth / 2, anchorHeight],
    });
  }

  _getAnchorHeight(iconHeight, unit) {
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