import { useSelector, useDispatch } from 'react-redux';
import { Fragment } from 'react';
import Main from './Main.js';
import Hello from './Hello.js';
import NewRecord from './NewRecord.js';
import NewAccount from './NewAccount.js';
import EditRecord from './EditRecord.js';
import Logout from './Logout.js';
import Login from './Login.js';
import { Route, Redirect,
  Switch, useHistory, useLocation } from 'react-router-dom';

const Content = () => {
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const tryToRefreshToken = () => {
    fetch('/api/refresh/token')
    .then(res => {
      if (res.status === 200) return res.json();
      if (res.status === 401) { 
        dispatch({ type: 'TOKEN', payload:
          { token: { status: 'invalid' } }});
      }
    })
    .then(data => {
      dispatch({ type: 'TOKEN', payload:
          { token: { string: data.token, status: 'valid' }}});
      dispatch({ type: 'LOGIN', payload: { user: data.user } });
      history.replace(location.pathname);
  })
    .catch(err => console.log(err));
  };

  const verifyToken = (accessToken) => {
    fetch('/api/verify/token', {
      method: 'POST', 
      body: JSON.stringify({ token: accessToken }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      if (res.status === 401) {
        tryToRefreshToken();
      }
    })
    .catch(err => console.log(err))
  };

  const PrivateRoute = ({ component: Component, ...rest }) => {
    if (user.username && token.string) {
      verifyToken(token.string);
    }
    if (token === 'empty' && user === 'empty') {
      tryToRefreshToken();
      return <p></p>;
    }
  
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
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/signup" component={NewAccount} />
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
