import React from 'react';
import {isRetina} from '../../common/helpers';
import {getUnitIcon} from '../helpers';

export const UnitIcon = ({unit, selected = false, ...rest}) => {
  const icon = getUnitIcon(unit, selected);
  return (
    <img src={isRetina() ? icon.retinaUrl : icon.url} height={icon.height} {...rest}/>
  );
};

export default UnitIcon;
