import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [info, setInfo] = useState('');

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
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        dispatch({ type: 'TOKEN', payload:
          { token: { string: data.token, status: 'valid' }}});
        dispatch({ type: 'LOGIN', payload: { user: data.user } });
        history.replace(from);
      } else {
        setInfo(data);
      }
    })
    .catch(err => console.log(err))
    setUsername('');
    setPassword('');
  };

  return (
    <div className="login">
      <div className="login-input">
        <label for="username">
          <b>Username</b>
        </label>
        <input
          type="text"
          placeholder="Enter Username"
          name="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label for="password">
          <b>Password</b>
        </label>
        <input
          type="password"
          placeholder="Enter Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={(e) => handleLogin(e)}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Login;
