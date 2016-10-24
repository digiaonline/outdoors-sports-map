// @flow

import {APP_NAME} from '../common/constants';

export const normalizeActionName = (name: string): string =>
  `${APP_NAME}/${name}`;