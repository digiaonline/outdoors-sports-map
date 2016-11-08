import React from 'react';
import moment from 'moment';
import {translate} from 'react-i18next';

const getDayDiff = (time) => {
  const mTime = moment(time);
  const mNow = moment();

  return mNow.diff(mTime, 'days');
};

const formatDayDiff = (days: Number, t: Function) => {
  let lookup = 'TIME.DAYS_AGO';
  if (days === 0 ) {
    lookup = 'TIME.TODAY';
  } else if (days === 1) {
    lookup = 'TIME.YESTERDAY'
  }
  return t(lookup, {days});
};

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
  <time dateTime={time.toUTCString()}>
    {
      formatTime(time, t)
    }
  </time>
);

export default Time;
