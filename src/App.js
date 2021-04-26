import { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './Header.js';
import Content from './Content.js';
import Footer from './Footer.js';
import Login from './Login.js';

import { connect } from 'react-redux';

const App = ({user}) => {
  return (
      <Router>
        <Fragment>
            <Header />
            {user ? <Content /> : <Login />}
            <Footer />
        </Fragment>
      </Router>
  );
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user: user }
}
export default connect(mapStateToProps)(App);
