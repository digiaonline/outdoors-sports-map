// @flow
export const latLngToArray = (latlng: {lat: number, lng: number}): Array<number> =>
  [latlng.lat, latlng.lng];