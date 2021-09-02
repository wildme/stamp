import './App.css';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './Header.js';
import Content from './Content.js';
import { Footer } from './Footer.js';
import Login from './Login.js';

const App = () => {
  //const dispatch = useDispatch();
  //const token = useSelector((state) => state.token);
  //const getToken = () => {
  //  fetch('/api/token', {
  //    method: 'GET',
  //    headers: { 'Content-Type': 'application/json' }
  //  })
  //  .then(res => res.json())
  //  .then(data => {
  //    dispatch({ type: 'TOKEN', payload: { token: data.token }});
  //  })
  //  .catch(err => console.log(err))
  //}

  //if (token === 'empty')  {
  //  getToken();
  //}

  return (
    <Router>
      <Fragment>
        <Header />
        <Content />
        <Footer />
      </Fragment>
    </Router>
  );
};

export default App;
