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

  return (
    <Router>
      <Fragment>
        <Header user={ user } />
        { token ? <Content token={ token } user={ user } /> : <Login setToken={ setToken } setUser={ setUser } /> }
        <Footer />
      </Fragment>
    </Router>
  );
};

export default App;
