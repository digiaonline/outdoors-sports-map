import {DEFAULT_LANG} from '../common/constants';
import {getAttr} from '../unit/helpers';
import isEmpty from 'lodash/isEmpty';

export const getServiceName = (id: number, services: Array<Object>, language: ?string = DEFAULT_LANG) => {
  if (!services || isEmpty(services)) {
    return '';
  }
  return getAttr(services[id].name, language);
};