import React from 'react';
import moment from 'moment';
import {translate} from 'react-i18next';

moment.locale('fi');

export const formatTime = (time: Date, t: Function) => {
  const endOfToday = moment().endOf('day');
  let lookup = 'TIME.';
  let options = {};

  if(endOfToday.diff(time, 'days') === 0) {
    lookup += 'TODAY';
  } else if (endOfToday.diff(time, 'days') === 1) {
    lookup += 'YESTERDAY';
  } else if (endOfToday.diff(time, 'weeks') === 0) {
    lookup += 'DAYS_AGO';
    options.days = endOfToday.diff(time, 'days');
  } else if (endOfToday.diff(time, 'months') === 0) {
    options.weeks = endOfToday.diff(time, 'weeks');
    lookup += options.weeks === 1 ? 'WEEK_AGO' : 'WEEKS_AGO';
  } else if (endOfToday.diff(time, 'years') > 1) {
    lookup += 'NOT_AVAILABLE';
  } else {
    options.months = endOfToday.diff(time, 'months');
    lookup += options.months === 1 ? 'MONTH_AGO' : 'MONTHS_AGO';
  }

  return t(lookup, options);
};

const Time = translate()(({time, t}) => {
  return <time dateTime={time.toISOString()}>
    {
      formatTime(time, t)
    }
    {moment().endOf('day').diff(time, 'days') < 2 && ' '+ time.getHours()+':'+('0'+time.getMinutes()).slice(-2)}
  </time>;
});

export default Time;