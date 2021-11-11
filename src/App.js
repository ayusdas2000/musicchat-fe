import './App.scss';
import React, { useEffect, Fragment } from 'react';
import NavbarComponent from './components/layout/navbar/Navbar';
import Landing from './components/layout/landing/Landing';
import Routes from './components/routing/Routes';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import store from './redux/store';
import { Provider } from 'react-redux';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './redux/actions/auth';
import { LOGOUT } from './redux/actions/types';

function App() {
  useEffect(() => {
    //check for token in local storage
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
    store.dispatch(loadUser());

    //logout from all tabs if they log out from one tab
    window.addEventListener('storage', () => {
      if (!localStorage.token) {
        store.dispatch({ type: LOGOUT });
      }
    });
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <NavbarComponent />
          <Switch>
            <Route exact path='/' component={Landing} disableScrollToTop={true} />
            <Route component={Routes} />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;
