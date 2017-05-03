//@flow
import {has, keys, sortBy} from 'lodash';
import moment from 'moment';
import {createRequest, createUrl} from '../api/helpers.js';
import {UnitServices, IceSkatingServices, SkiingServices, SwimmingServices} from '../service/constants';
import {UNIT_PIN_HEIGHT, UNIT_HANDLE_HEIGHT, UnitQuality, UnitFilters, QualityEnum} from './constants';
import {DEFAULT_LANG} from '../common/constants';
import upperFirst from 'lodash/upperFirst';
import values from 'lodash/values';
import memoize from 'lodash/memoize';
import {LatLng, GeoJSON} from 'leaflet';
import * as GeometryUtil from 'leaflet-geometryutil';

export const getFetchUnitsRequest = (params: Object)  => {
  return createRequest(createUrl('unit/', {
    service: `${values(UnitServices).join(',')}`,
    only: 'id,name,location,street_address,address_zip,extensions,services,municipality,phone,www_url',
    include: 'observations,connections',
    geometry: 'true',
    page_size: 1000,
    ...params,
  }));
};

export const getAttr = (attr: Object, lang: ?string = DEFAULT_LANG) => {
  let translated = has(attr, lang) && attr[lang];
  if (!translated) {
    for (let i = 0; i < keys(attr).length; ++i) {
      translated = attr[keys(attr)[i]];
      if (translated) {
        break;
      }
    }
  }
  return translated || null;
};

export const getUnitPosition = (unit: Object): Array<number> => {
  // If the unit doesn't have set location but has a geometry, eg. ski track,
  // use the first point in the geometry.
  if (!unit.location && unit.geometry === 'MultiLineString' && unit.geometry.coordinates) {
    return unit.geometry.coordinates[0][0].slice().reverse();
  }

  return unit.location.coordinates.slice().reverse();
};

export const getUnitSport = (unit: Object) => {
  if(unit.services && unit.services.length) {
    const service = unit.services[0];

    if (IceSkatingServices.includes(service)) {
      return UnitFilters.ICE_SKATING;
    }

    if (SkiingServices.includes(service)) {
      return UnitFilters.SKIING;
    }

    if (SwimmingServices.includes(service)) {
      return UnitFilters.SWIMMING;
    }
  }

  return 'unknown';
};

export const getObservation = (unit: Object, matchProperty: ?string='condition') => {
  const {observations} = unit;

  return observations ? observations.find((obs) => obs.property.includes(matchProperty)) : null;
};

export const getUnitQuality = (unit: Object): string => {
  const ConditionObservationMapping = {
    [UnitFilters.ICE_SKATING]: 'condition',
    [UnitFilters.SKIING]: 'condition',
    [UnitFilters.SWIMMING]: 'algae',
  };

  const matchCriteria = ConditionObservationMapping[getUnitSport(unit)] || 'condition';
  const observation = getObservation(unit, matchCriteria);
  return observation ? observation.quality : UnitQuality.UNKNOWN;
};

export const getOpeningHours = (unit: Object, activeLang: string): string => {
  if(unit.services[0].id == UnitServices.MECHANICALLY_FROZEN_ICE && unit.connections && unit.connections[1]){
    return (getAttr(unit.connections[1].name, activeLang) || '');
  }
  return '';
};

export const getObservationTime = (observation: Object) => {
  return(moment(observation && observation.time || 0).toDate());
};

export const enumerableQuality = (quality: string): number => {
  return QualityEnum[quality] ? QualityEnum[quality] : Number.MAX_VALUE;
};


/**
 * ICONS
 */

export const getUnitIconURL = (unit: Object, selected: ?boolean = false, retina: ?boolean = true) => {
  const quality = getUnitQuality(unit);
  const sport = getUnitSport(unit);
  const onOff = selected ? 'on' : 'off';
  const resolution = retina ? '@2x' : '';

  return require(`@assets/markers/${sport}-${quality}-${onOff}${resolution}.png`);
};

export const getUnitIconHeight = (unit: Object) => (
  getUnitSport(unit) === UnitFilters.SKIING ? UNIT_HANDLE_HEIGHT : UNIT_PIN_HEIGHT
);


export const getUnitIcon = (unit: Object, selected: ?boolean = false) => (
  {
    url: getUnitIconURL(unit, selected, false),
    retinaUrl: getUnitIconURL(unit, selected, true),
    height: getUnitIconHeight(unit),
  }
);

export const getFilterIconURL = (filter: String) =>
  filter ? require(`@assets/icons/icon-white-${filter}@2x.png`) : '';

/**
 * SORT UNIT LIST
 */

const _sortByDistance = (units: Array<Object>, position: Array<number>, leafletMap: Object, filterString: String) => {
  if (leafletMap === null) {
    return units;
  }
  const positionLatLng = new LatLng(...position);
  return sortBy(units, (unit) => {
    if (unit.geometry === null || unit.geometry === undefined || unit.geometry.type === 'Point') {
      if (unit.location === null || unit.location === undefined) {
        return 0;
      }
      return positionLatLng.distanceTo(GeoJSON.coordsToLatLng(unit.location.coordinates));
    }
    const latLngs = GeoJSON.coordsToLatLngs(unit.geometry.coordinates, 1);
    const closestLatLng = GeometryUtil.closest(
      leafletMap, latLngs, positionLatLng);
    return positionLatLng.distanceTo(closestLatLng);
  });
}

export const sortByDistance = memoize(_sortByDistance, (units, pos, leafletMap, filterString) => {
  if (leafletMap === null || units.length === 0 || pos === undefined) {
    return '0';
  }
  return `${filterString};${pos[0]};${pos[1]}`;
});

export const sortByName = (units: Array, lang: ?string) =>
  sortBy(units, (unit) => getAttr(unit.name, lang));

export const sortByCondition = (units: Array) =>
  sortBy(units, [
    (unit) => {
      return enumerableQuality(getUnitQuality(unit));
    },
    (unit) => {
      const observation = getObservation(unit);
      const observationTime =
        observation && observation.time && (new Date(observation.time)).getTime() || 0;

      return (new Date()).getTime() - observationTime;
    },
  ]);

export const getAddressToDisplay = (address, activeLang) => {
  return Object.keys(address).length !== 0
    ? getAttr(address.street.name, activeLang)+' '+address.number+', '+upperFirst(address.street.municipality)
    : null;
};