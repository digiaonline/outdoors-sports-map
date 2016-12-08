import React from 'react';
import moment from 'moment';
import {translate} from 'react-i18next';

const formatTime = (time: Date, t: Function) => {
  const now = moment();
  let lookup = 'TIME.';
  let options = {};

  if(now.diff(time, 'days') === 0) {
    lookup += 'TODAY';
  } else if (now.diff(time, 'days') === 1) {
    lookup += 'YESTERDAY';
  } else if (now.diff(time, 'weeks') === 0) {
    lookup += 'DAYS_AGO';
    options.days = now.diff(time, 'days');
  } else if (now.diff(time, 'months') === 0) {
    lookup += 'WEEKS_AGO';
    options.weeks = now.diff(time, 'weeks');
  } else if (now.diff(time, 'years' > 1)) {
    lookup += 'NOT_AVAILABLE';
  } else {
    lookup += 'MONTHS_AGO';
    options.months = now.diff(time, 'months');
  }

  return t(lookup, options);
};

const Time = translate()(({time, t}) =>
  <time dateTime={time.toISOString()}>
    {
      formatTime(time, t)
    }
    {moment().diff(time, 'days') < 2 && ' '+time.getHours()+':'+time.getMinutes()}
  </time>
);

export default Time;
