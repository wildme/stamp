import './App.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import Main from './Main.js';
import Hello from './Hello.js';
import NewRecord from './NewRecord.js';
import EditRecord from './EditRecord.js';
import Logout from './Logout.js';
import Login from './Login.js';
import { Route, Redirect } from 'react-router-dom';

const Content = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);

  const verifyToken = (accessToken) => {
    fetch('/api/verify/token', {
      method: 'POST', 
      body: JSON.stringify({ token }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      if (data.user === user.username) return true;
      else return false;
    })
    .catch(err => console.log(err))
  };
  const PrivateRoute = ({ children, ...rest }) => {
    const isValid = verifyToken(token);
    return (
      <Route
        {...rest}
      render={({ location }) => 
        isValid ? ( children ) : ( <Redirect
          to={{ pathname: "/login", state: { from: location }}}
          />
        )
      }
      />
    );
  }

  return (
    <Fragment>
      <header>
        <Hello />
      </header>
     <main>
        <Route exact path="/login" component={Login} />
    <PrivateRoute path="/inbox">
    <Main />
    </PrivateRoute>
    <PrivateRoute path="/outbox">
    <Main />
    </PrivateRoute>
    <PrivateRoute path="/:box/new">
    <NewRecord />
    </PrivateRoute>
    <PrivateRoute path="/:box/edit/:id">
    <EditRecord />
    </PrivateRoute>
    {/*
        <Route exact path="/login" component={Login} />
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/inbox" component={Main} />
        <Route exact path="/outbox" component={Main} />
        <Route exact path="/:box/new" component={NewRecord} />
        <Route exact path="/:box/edit/:id" component={EditRecord} />
        */}
      </main>
    </Fragment>
  );
};

export default Content;
