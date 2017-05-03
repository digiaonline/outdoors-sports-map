import 'babel-polyfill';
import React, {createElement} from 'react';
import {render} from 'react-dom';
import {browserHistory, createMemoryHistory} from 'react-router';
import {AppContainer} from 'react-hot-loader';
import Root from './modules/common/components/Root';

import './index.scss';

const renderApp = (rootComponent) =>
  render(
    <AppContainer>
      {createElement(rootComponent, {history: createMemoryHistory()})}
    </AppContainer>,
    document.getElementById('root')
  );

renderApp(Root);

if (__DEV__ && module.hot) {
  module.hot.accept(
    './modules/common/components/Root',
    () => renderApp(require('./modules/common/components/Root').default)
  );
}