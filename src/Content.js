import { useSelector, useDispatch } from 'react-redux';
import { Fragment } from 'react';
import Box from './Box.js';
import HomePage from './HomePage.js';
import NewRecord from './NewRecord.js';
import Signup from './Signup.js';
import EditRecord from './EditRecord.js';
import RecordCard from './RecordCard.js';
import Logout from './Logout.js';
import Login from './Login.js';
import Contacts from './Contacts.js';
import NewContact from './NewContact.js';
import ErrorPage from './ErrorPage.js';
import UserProfile from './UserProfile.js';
import { Route, Redirect,
  Switch, useHistory, useLocation } from 'react-router-dom';

const onPageReload = (dispatch, history, location) => {
  const url = "/api/page-reload";
  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      if (res.status === 401) {
        localStorage.removeItem('at');
        dispatch({ type: 'INFO', payload: { info: null } });
        dispatch({ type: 'SETTINGS', payload: { settings: null } });
        dispatch({ type: 'LOGIN', payload: { user:
          { username: null, admin: null, loggedIn: false } }});return 1;
      }
      if (res.status === 500) {
        return 1;
      }
    })
    .then(data => {
      if (data !== 1) {
        localStorage.setItem('at', data.token);
        dispatch({ type: 'INFO', payload:
          { info: { fullname: data.user.fullname, email: data.user.email }} });
        dispatch({ type: 'SETTINGS', payload: { settings: data.settings } });
        dispatch({ type: 'LOGIN', payload:
          { user: { username: data.user.username,
            admin: data.user.admin, loggedIn: true } }});
        history.replace(location.pathname);
      }
    })
    .catch((e) => console.error(e));
};

const Content = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const PrivateRoute = ({ component: Component, ...rest }) => {
    if (!user) {
      onPageReload(dispatch, history, location);
      return <p></p>;
    }
  
    return (
      <Route {...rest} render={(props) => 
        user.loggedIn ? <Component {...props} /> : (
            <Redirect to={{
              pathname: "/login", state: { from: props.location }
          }}
          />
        )
      }
      />
    );
  };

  return (
    <Fragment>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/signup" component={Signup} />
        <PrivateRoute exact path="/logout" component={Logout} />
        <PrivateRoute exact path="/" component={HomePage} />
        <PrivateRoute exact path="/contacts" component={Contacts} />
        <PrivateRoute exact path="/contacts/new" component={NewContact} />
        <PrivateRoute exact path="/letters" component={Box} />
        <PrivateRoute path="/my-profile" component={UserProfile} />
        <PrivateRoute exact path="/:box/new" component={NewRecord} />
        <PrivateRoute exact path="/:box/view/:id" component={RecordCard} />
        <PrivateRoute exact path="/:box/edit/:id" component={EditRecord} />
        <PrivateRoute path="*" component={ErrorPage} />
      </Switch>
    </Fragment>
  );
};

export default Content;
