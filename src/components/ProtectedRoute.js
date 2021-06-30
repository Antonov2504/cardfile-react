import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';
import Header from './Header';
import Footer from './Footer';

function ProtectedRoute({ component: Component, ...props }) {
  const value = useContext(AppContext);
  return (
    <Route>
      <Header {...props} />
      {
        value.loggedIn ? <Component {...props} /> : <Redirect to="/signin" />
      }
      <Footer />
    </Route>
  )
}

export default ProtectedRoute;