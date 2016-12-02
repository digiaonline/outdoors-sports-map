import React from 'react';
import {isRetina} from '../../common/helpers';
import {getUnitIcon} from '../helpers';

export const UnitIcon = ({unit, selected = false, ...rest}) => {
  const icon = getUnitIcon(unit, selected);
  const iconWidth = 32;

  return (
    <img src={isRetina() ? icon.retinaUrl : icon.url} height={icon.height} width={iconWidth} {...rest}/>
  );
};

export default UnitIcon;
