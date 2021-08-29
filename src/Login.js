import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [jwt, setJwt] = useState('');
  const [info, setInfo] = useState('');

  const verifyToken =  (jwt) => {
    const bearer = 'Bearer ' + jwt;
    fetch('/api/token', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': bearer }
    })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  };

  const handleLogin = (e) => {
    e.preventDefault();
    fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({username, password}),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => res.json())
    .then(data => {
      data.jwt ? setJwt(data.jwt) : setInfo(data)
    })
    .catch(err => console.log(err))
    
    setUsername('');
    setPassword('');
  };

  if (jwt) {
    verifyToken(jwt);
      return <Redirect to="/" />
    }
  if (info) console.log(info);

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
