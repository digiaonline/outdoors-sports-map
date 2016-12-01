import React from 'react';

export const OSMIcon = ({icon, ...rest}) =>
  <span className={`icon-${icon}`} {...rest} />;

export default OSMIcon;
