import {normalizeActionName} from '../common/helpers.js';

export const MAP_URL = 'https://geoserver.hel.fi/mapproxy/wmts/osm-lite/etrs_tm35fin/{z}/{x}/{y}.png';
export const MAP_RETINA_URL = 'https://geoserver.hel.fi/mapproxy/wmts/osm-lite-hq/etrs_tm35fin_hq/{z}/{x}/{y}.png';

export const DEFAULT_ZOOM = 9;
export const MIN_ZOOM = 8;
export const MAX_ZOOM = 15;
export const BOUNDARIES = [[59.4, 23.8], [61.5, 25.8]];

export const mapActions = {
  SET_LOCATION: normalizeActionName('map/SET_LOCATION'),
  RECEIVE_ADDRESS: normalizeActionName('map/RECEIVE_ADDRESS')
};
