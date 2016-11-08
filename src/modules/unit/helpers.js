//@flow
import {has, keys, sortBy, reverse} from 'lodash';
import {LatLng} from 'leaflet';

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

export const getUnitIconURL = (status = 'unknown'/*, service*/) => {
  return require(`@assets/markers/marker-icon-2x-${status}.png`);
};

export const sortByDistance = (units: Array, position: Array) =>
  sortBy(units, (unit) => {
    const unitLatLng = new LatLng(...getUnitPosition(unit));
    const mapLatLng = new LatLng(...position);
    return unitLatLng.distanceTo(mapLatLng);
  });

export const sortByName = (units: Array) =>
  sortBy(units, (unit) => getAttr(unit.name));
