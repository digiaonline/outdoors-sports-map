import {normalizeActionName} from '../common/helpers';

export const homeActions = {
  SET_HELLO_MESSAGE: normalizeActionName('home/SET_HELLO_MESSAGE')
};

export const locations = {
  HELSINKI: [60.171944, 24.941389],
  ESPOO: [60.19792, 24.708885],
  VANTAA: [60.309045, 25.004675]
};

export const views = {
  LIST: 'list',
  MAP: 'map'
};