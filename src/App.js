import './App.css';
import Header from './Header.js';
import Content from './Content.js';
import Footer from './Footer.js';
import Login from './Login.js';

import { connect } from 'react-redux';

const App = ({user}) => {
  return (
      <div className="main">
        <Header />
      {user ? <Content /> : <Login />}
        <Footer />
      </div>
  );
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user: user }
}
export default connect(mapStateToProps)(App);
