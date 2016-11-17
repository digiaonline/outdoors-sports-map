// @flow
import {APP_NAME, QueryValue} from './constants';

export const normalizeActionName = (name: string): string =>
  `${APP_NAME}/${name}`;

export const arrayifyQueryValue = (queryValue: QueryValue): Array<string> => {
  // Handle undefined
  if (typeof queryValue === 'undefined') {
    return [];
  }
  // Handle single values
  else if (!Array.isArray(queryValue)){
    return [queryValue];
  }
  // It's an array
  return queryValue;
};
