// @flow
import React, {Component, PropTypes} from 'react';
import {Button, Glyphicon} from 'react-bootstrap';
import {View} from './View.js';
import {Map, Marker, Popup, TileLayer} from 'react-leaflet';
import {getAttr} from '../helpers.js';
import {translate} from 'react-i18next';

const UnitMarker = translate()(({position, name, address, www, description, t}) => (
  <Marker position={position}>
    <Popup>
      <PopupContent name={name} address={address} www={www} description={description} t={t}/>
    </Popup>
  </Marker>));

const PopupContent = ({name, address, www, description, t}) => (
  <div className="view-popup__content">
    <h3>{name}</h3>
    <h4>{address}</h4>
    <p><strong>{t('LIST.STATE')}:</strong> {t('LIST.UNKNOWN')}</p> {/*TODO: replace hard coding with real condition*/}
    <p>{description}</p>
    <p><a href={www} target="_blank">{t('VIEW.POPUP.OPENING_HOURS')}</a></p>
  </div>);

export class MapView extends Component {
  static propTypes = {
    position: PropTypes.array.isRequired,
    units: PropTypes.array
  };

  constructor(props: Object) {
    super(props);

    this.onMoveend = this.onMoveend.bind(this);
    this.locateUser = this.locateUser.bind(this);
  }

  onMoveend(e: Object): void{
    const center = [e.target.getCenter().lat, e.target.getCenter().lng];
    this.props.handleMoveend(center);
  }

  locateUser() {
    this.refs.map.leafletElement.locate({setView: true});
  }

  render() {
    const {position, units, selected} = this.props;
    return (
      <View id="map-view" className="map-view" isSelected={selected}>
        <Map ref="map" zoomControl={false} center={position} zoom={12} onMoveend={this.onMoveend} >
          <TileLayer
        url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          />
          {
            units && units.map(
              (unit, index) =>
                <UnitMarker
                  position={unit.location.coordinates.reverse()}
                  www={getAttr(unit.www_url)}
                  name={getAttr(unit.name)}
                  address={getAttr(unit.street_address)}
                  description={getAttr(unit.description)}
                  key={index} />)}
        </Map>
        <div className="overlay-control">
          <Button bsSize="large" className="overlay-control__locate" onClick={this.locateUser}>
            <Glyphicon glyph="screenshot"/>
          </Button>
          <Button bsSize="large" className="overlay-control__info">
            <Glyphicon glyph="info-sign"/>
          </Button>
        </div>
      </View>
    );
  }
}