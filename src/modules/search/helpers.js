//@flow
import {has, keys, sortBy, reverse} from 'lodash';
import {LatLng} from 'leaflet';
import {QualityEnum, IceSkatingServices, SwimmingServices, SkiingServices} from './constants';

// FIXME: get the lang parameter actually from somewhere
export const getAttr = (attr: Object, lang: ?string = 'en') => {
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

export const getUnitPosition = (unit: Object) => {
  return unit.location.coordinates.slice().reverse();
};

export const getUnitSport = (unit: Object) => {
  if(unit.services && unit.services.length) {
    const service = unit.services[0];

    if (IceSkatingServices.includes(service.id)) {
      return 'iceskate';
    }

    if (SkiingServices.includes(service.id)) {
      return 'ski';
    }

    if (SwimmingServices.includes(service.id)) {
      return 'swim';
    }
  }

  return 'unknown';
};

export const getServiceName = (unit: Object) => {
  return getAttr(unit.services[0].name);
};

export const getObservation = (unit: Object) => {
  const {observations} = unit;
  return observations && observations.length ? observations[0] : null;
};

export const getUnitQuality = (unit: Object): string => {
  const observation = getObservation(unit);
  return observation ? observation.quality : 'unknown';
};

export const enumerableQuality = (quality: string): number => {
  return QualityEnum[quality] ? QualityEnum[quality] : Number.MAX_VALUE;
};

export const getUnitIconURL = (unit: Object, selected = false, retina = true) => {
  const quality = getUnitQuality(unit);
  const sport = getUnitSport(unit);
  const onOff = selected ? 'on' : 'off';
  const resolution = retina ? '@2x' : '';

  return require(`@assets/markers/${sport}-${quality}-${onOff}${resolution}.png`);
};

export const getFilterIconURL = (filter: String, active: Boolean) => {
  if (filter)
    return require(`@assets/markers/${filter}-${active ? 'good' : 'unknown'}-off@2x.png`);
};

export const sortByDistance = (units: Array, position: Array) =>
  sortBy(units, (unit) => {
    const unitLatLng = new LatLng(...getUnitPosition(unit));
    const mapLatLng = new LatLng(...position);
    return unitLatLng.distanceTo(mapLatLng);
  });

export const sortByName = (units: Array) =>
  sortBy(units, (unit) => getAttr(unit.name));

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