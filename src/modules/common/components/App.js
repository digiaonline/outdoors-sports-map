import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import HomeContainer from '../../home/components/HomeContainer';

const routes = (
  <Route path="/">
    <IndexRoute component={HomeContainer}/>
  </Route>
);

const App = ({store, history}) => (
  <Provider store={store}>
    <Router history={history} routes={routes} key={Math.random()}/>
  </Provider>
);

export default App;