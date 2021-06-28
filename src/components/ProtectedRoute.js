import React, { useContext } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { AppContext } from '../contexts/AppContext';

function ProtectedRoute({ component: Component, ...props }) {
  const value = useContext(AppContext);
  return (
    <Route>
      {
        value.loggedIn ? <Component {...props} /> : <Redirect to="/signin" />
      }
    </Route>
  )
}

export default ProtectedRoute;