import { connect } from 'react-redux';
import { logout } from './redux/actions.js';
import { Fragment } from 'react';
import { Route, Redirect } from 'react-router-dom';

const Logout = ({ dispatch }) => {
  dispatch(logout());
  return (
    <Fragment>
      <Route exact path="/logout" render={() => <Redirect to="/" />} />
    </Fragment>
  );
};

export default connect()(Logout);
