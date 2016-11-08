// @flow

import {APP_NAME} from '../common/constants';

export const normalizeActionName = (name: string): string =>
  `${APP_NAME}/${name}`;

export const arrayifyQueryValue = (queryValue: mixed): mixed => {
  // Hndle undefined
  if (typeof queryValue === 'undefined') {
    return undefined;
  }
  // Handle single values
  else if (!Array.isArray(queryValue)){
    return [queryValue];
  }
  // It's an array
  return queryValue;
};
