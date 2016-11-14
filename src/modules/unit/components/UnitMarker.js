import React from 'react';
import {Marker} from 'react-leaflet';
import {Icon} from 'leaflet';
import {withRouter} from 'react-router';
import {getUnitIconURL} from '../helpers';

const createIcon = (unit: Object) =>
  new Icon({
    iconUrl: getUnitIconURL(unit, false, false),
    iconRetinaUrl: getUnitIconURL(unit),
    iconSize: [30, 36], // TODO: height 36 for skating etc and 30 for skiing
    iconAnchor: [15, 36]
  });

const UnitMarker = ({unit, router, handleClick, ...rest}) =>
  <Marker
    icon={createIcon(unit)}
    onClick={() => {
      router.push(`/unit/${unit.id}`);
      handleClick();
    }}
    {...rest}/>;

export default withRouter(UnitMarker);
