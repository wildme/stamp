import React, { useState } from 'react';
import { useHistory, useLocation, NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginFailure, setLoginFailure] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { from } = location.state || { from: { pathname: "/" } }; ;

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      if (res.status === 200) return res.json();
      if (res.status === 401) setLoginFailure(true);
    })
    .then(data => {
        dispatch({ type: 'TOKEN', payload:
          { token: { string: data.token, status: 'valid' }}});
        dispatch({ type: 'LOGIN', payload: { user: data.user } });
        setUsername('');
        setPassword('');
        history.replace(from);
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="login-grid-container">
      <div className="login-form">
    { loginFailure && 
      <div className="error-message">Bad username or password</div> }
        <form onSubmit={(e) => handleLogin(e)}>
          <p><input
            type="text"
            placeholder="Enter Username"
            name="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          /></p>
          <p><input
            type="password"
            placeholder="Enter Password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          /></p>
          <input value="Login" id="submit" type="submit" />
          <div className="signup-message">Don't have an account?
          <NavLink to="/signup">Sign Up</NavLink>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
