import './App.css';
import React, { useState } from 'react';
import { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header.js';
import Content from './Content.js';
import { Footer } from './Footer.js';
import Login from './Login.js';

const App = () => {
  const [token, setToken] = useState('');
  const [user, setUser] = useState('');
  const getToken = () => {
    fetch('/api/token', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      setToken(data.token);
      setUser(data.user);
      return (<Content token={ token } user={ user } />);
    })
    .catch(err => console.log(err))
  }

  if (!token) getToken();

  return (
    <Router>
      <Fragment>
        <Header user={ user } />
        { token && user ?
          <Content token={ token } user={ user } /> :
          <Login setToken={ setToken } setUser={ setUser } />
        }
        <Footer />
      </Fragment>
    </Router>
  );
};

export default App;
