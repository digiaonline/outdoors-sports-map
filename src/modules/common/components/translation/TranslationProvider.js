import React from 'react';
import {I18nextProvider} from 'react-i18next';
import i18next from 'i18next';
import keyBy from 'lodash/keyBy';
import mapValues from 'lodash/mapValues';
import mapKeys from 'lodash/mapKeys';

const localesContext = require.context('../../../../../locales', false, /\.json$/);

const listOfLocalePaths = localesContext.keys();
const requireLocaleByPath = localesContext;
const localesByPath =
  mapValues(
    keyBy(listOfLocalePaths, (s) => s),
    (localePath) => ({ translation: requireLocaleByPath(localePath) })
  );

const localesByName =
  mapKeys(localesByPath, (_, localePath) => {
    return localePath.replace(/^\.\//, '').replace(/\.json$/, '');
  });

const i18n =
  i18next
    .init({
      resources: localesByName,
      lng: 'en' // @todo: How should the user pick their preferred language? #UX
    }, (err, t) => {
      // @todo: do we have some error reporting mechanism in production?
      if (err) {
        console.log(err, t);
      }
    });

export default class TranslationProvider extends React.Component {
  render() {
    return <I18nextProvider i18n={i18n}>{this.props.children}</I18nextProvider>;
  }
}
