import {normalizeActionName} from '../common/helpers';

export const MAP_URL = 'https://api.mapbox.com/styles/v1/tituomin/civ9gjuzd000d2jpyhizymhjr/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoidGl0dW9taW4iLCJhIjoiS29lVUNMayJ9.TNwCZkDKvgNLMelagkad7w';

export const mapActions = {
  UPDATE_CENTER: normalizeActionName('map/UPDATE_CENTER')
};
