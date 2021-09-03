import './App.css';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Fragment } from 'react';
import Main from './Main.js';
import Hello from './Hello.js';
import NewRecord from './NewRecord.js';
import EditRecord from './EditRecord.js';
import Logout from './Logout.js';
import Login from './Login.js';
import { Route, Redirect, Switch } from 'react-router-dom';

const Content = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();

  const verifyToken = (accessToken) => {
    fetch('/api/verify/token', {
      method: 'POST', 
      body: JSON.stringify({ token: accessToken }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      if (res.status === 401) {
        dispatch({ type: 'TOKEN', payload:
          { token: { string: accessToken, status: 'invalid' }}});
      }
    })
    .catch(err => console.log(err))
  };

  const PrivateRoute = ({ component: Component, ...rest }) => {
    if (token !== 'empty') verifyToken(token.string);
    return (
      <Route
        {...rest}
      render={(props) => 
        token.status === 'valid' ? (
          <Component {...props} /> ) : (
            <Redirect
          to={{
            pathname: "/login", state: { from: props.location }
          }}
          />
        )
      }
      />
    );
  }

  return (
    <Fragment>
      <Switch>
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/" component={Hello} />
        <PrivateRoute exact path="/inbox" component={Main} />
        <PrivateRoute exact path="/outbox" component={Main} />
        <PrivateRoute exact path="/:box/new" component={NewRecord} />
        <PrivateRoute exact path="/:box/edit/:id" component={EditRecord} />
    </Switch>
    </Fragment>
  );
};

export default Content;
