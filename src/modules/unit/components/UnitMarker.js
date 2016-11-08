import React from 'react';
import {Marker} from 'react-leaflet';
import {Icon} from 'leaflet';
import {withRouter} from 'react-router';
import {getUnitIconURL} from '../helpers';

const createIcon = (unit: Object) =>
  new Icon({
    iconUrl: getUnitIconURL(unit, false, false),
    iconRetinaUrl: getUnitIconURL(unit),
    iconSize: [32, 40],
    iconAnchor: [16, 40]
  });

const UnitMarker = ({unit, router, ...rest}) =>
  <Marker
    icon={createIcon(unit)}
    onClick={() => {
      router.push(`/unit/${id}`);
      handleClick();
    }}
    {...rest}/>;

export default withRouter(UnitMarker);
