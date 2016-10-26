import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import HomeContainer from '../../home/components/HomeContainer';
import TranslationProvider from './translation/TranslationProvider';

const routes = (
    <Route path="/">
      <IndexRoute component={HomeContainer}/>
    </Route>
);

const App = ({store, history}) => (
  <TranslationProvider>
    <Provider store={store}>
        <Router history={history} routes={routes} key={Math.random()}/>
      </Provider>
  </TranslationProvider>
);

export default App;