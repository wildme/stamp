import './App.css';
import { Fragment } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Header } from './Header.js';
import Content from './Content.js';
import { Footer } from './Footer.js';

const App = () => {

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
