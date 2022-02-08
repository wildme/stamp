import { useState } from 'react';
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
    fetch("/api/signup", {
      method: 'POST',
      body: JSON.stringify({ username, password,
        firstname, lastname, email }),
      headers: { 'Content-Type': 'application/json' }
    })
    .then(res => {
      if (res.status === 409) return res.json();
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
    .catch((e) => console.error(e))
  };

  return (
    <div className="login-grid-container">
      <div className="login-form-container">
    {error &&
        <div className="login-error-msg">{infoMsg}</div>}
          <form onSubmit={(e) => handleSignup(e)} autoComplete="off">
            <div className="login-input-container">
              <input
                type="text"
                placeholder="Username"
                name="username"
                value={username}
                required
                minLength="3"
                maxLength="25"
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                name="email"
                value={email}
                required
                minLength="6"
                maxLength="40"
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                placeholder="Password"
                name="password"
                value={password}
                required
                minLength="8"
                maxLength="255"
                onChange={(e) => setPassword(e.target.value)}
              />
              <input
                type="password"
                placeholder="Confirm password"
                name="confirm-password"
                value={confirmPassword}
                required
                minLength="8"
                maxLength="255"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
              <input
                type="text"
                placeholder="Firstname"
                name="firstname"
                value={firstname}
                required
                maxLength="50"
                onChange={(e) => setFirstname(e.target.value)}
              />
              <input
                type="text"
                placeholder="Lastname"
                name="lastname"
                value={lastname}
                maxLength="50"
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
            <div className="login-btn-container">
              <input value="Signup" id="submit" type="submit" />
            </div>
          </form>
      </div>
    </div>
  );
};

export default NewAccount;
