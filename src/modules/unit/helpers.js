//@flow
import {has, keys, sortBy, reverse} from 'lodash';
import {LatLng} from 'leaflet';
import {QualityEnum} from './constants';

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

export const getObservation = (unit: Object) => {
  const {observations} = unit;
  return observations.length ? observations[0] : null;
};

export const getUnitQuality = (unit: Object): string => {
  const observation = getObservation(unit);
  return observation ? observation.quality : 'unknown';
};

export const enumerableQuality = (quality: string): number => {
  return QualityEnum[quality] ? QualityEnum[quality] : Number.MAX_VALUE;
};

export const getUnitIconURL = (quality = 'unknown'/*, service*/) => {
  return require(`@assets/markers/marker-icon-2x-${quality}.png`);
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
    }
  ]);
