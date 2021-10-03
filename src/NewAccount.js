import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const NewAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [error, setError] = useState(false);

  const history = useHistory();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert('Passwords don\'t match');
      return;
    }
    fetch('/api/signup', {
      method: 'POST',
      body: JSON.stringify({ username, password,
        firstname, lastname, email }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      if (res.status === 409) {
        return res.json();
      }
      if (res.status === 201) {
        setInfoMsg('Account created!');
        history.replace('/login');
      }
    })
    .then(data => {
      if (data.error) {
        setError(true);
        setInfoMsg(data.error);
      }
    })
    .catch(err => console.log(err))
  };

  return (
    <div className="signup-grid-container">
      <div className="signup-form">
    { error &&
      <div className="error-message">{infoMsg}</div> }
        <form onSubmit={(e) => handleSignup(e)} autoComplete="off">
          <p><input
            type="text"
            placeholder="Username"
            name="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          /></p>
          <p><input
            type="email"
            placeholder="Email"
            name="email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          /></p>
          <p><input
            type="password"
            placeholder="Password"
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          /></p>
          <p><input
            type="password"
            placeholder="Confirm password"
            name="confirm-password"
            value={confirmPassword}
            required
            onChange={(e) => setConfirmPassword(e.target.value)}
          /></p>
          <p><input
            type="text"
            placeholder="Firstname"
            name="firstname"
            value={firstname}
            required
            onChange={(e) => setFirstname(e.target.value)}
          /></p>
          <p><input
            type="text"
            placeholder="Lastname"
            name="lastname"
            value={lastname}
            required
            onChange={(e) => setLastname(e.target.value)}
          /></p>
          <input value="Signup" id="submit" type="submit" />
        </form>
      </div>
    </div>
  );
};

export default NewAccount;