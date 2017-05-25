import React from 'react';

export const SMIcon = ({icon, className, ...rest}) =>
  <span className={`icon-icon-${icon} ${className ? className : ''}`} {...rest} />;

export default SMIcon;