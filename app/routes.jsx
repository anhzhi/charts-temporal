import React from 'react';
import { Route, IndexRoute } from 'react-router';

import { fetchVoteData } from 'fetch-data';
import Layout from 'containers/Layout';
import Home from 'containers/Home';
import LoginOrRegister from 'containers/LoginOrRegister';
import Treatment from 'containers/Treatment';

/*
 * @param {Redux Store}
 * We require store as an argument here because we wish to get
 * state from the store after it has been authenticated.
 */
export default (store) => {
  const requireAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (!authenticated) {
      replace({
        pathname: '/login',
        state: { nextPathname: nextState.location.pathname }
      });
    }
    callback();
  };

  const redirectAuth = (nextState, replace, callback) => {
    const { user: { authenticated }} = store.getState();
    if (authenticated) {
      replace({
        pathname: '/charts'
      });
    }
    callback();
  };
  return (
    <Route path="/" component={Layout}>
      <IndexRoute component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="login" component={LoginOrRegister} onEnter={redirectAuth} />
      <Route path="charts" component={Treatment} onEnter={requireAuth} />
    </Route>
  );
};
