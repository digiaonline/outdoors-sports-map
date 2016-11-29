import {normalizeActionName} from '../common/helpers';

export const MAP_URL = 'https://api.mapbox.com/styles/v1/tituomin/civ9gjuzd000d2jpyhizymhjr/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGl0dW9taW4iLCJhIjoiS29lVUNMayJ9.TNwCZkDKvgNLMelagkad7w';
export const DEFAULT_ZOOM = 13;
export const MIN_ZOOM = 12;
export const BOUNDARIES = [[60.1, 24.65], [60.4, 25.4]];

export const mapActions = {
  SET_LOCATION: normalizeActionName('map/SET_LOCATION')
};
