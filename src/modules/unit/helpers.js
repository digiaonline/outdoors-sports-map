//@flow
import keys from 'lodash/keys';
import has from 'lodash/has';

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
