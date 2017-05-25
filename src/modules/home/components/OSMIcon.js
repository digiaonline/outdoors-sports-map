import React from 'react';

export const OSMIcon = ({icon, className, ...rest}) =>
  <span className={`icon-${icon} ${className ? className : ''}`} {...rest} />;

export default OSMIcon;