import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FlashMessage from './FlashMessage.js'

const NewAccount = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const { t } = useTranslation();
  const history = useHistory();

  const handleSignup = (e) => {
    e.preventDefault();
    setInfoMsg('');

    if (password !== confirmPassword) {
      setInfoMsg(t('signup.infoMsg1'));
      return null;
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
        setInfoMsg(t('signup.infoMsg5'));
        history.replace('/login');
      }
      if (res.status === 500) {
        setInfoMsg(t('signup.infoMsg4'));
      }
    })
    .then(data => {
      if (data && data.error === 'user exists') {
        setInfoMsg(t('signup.infoMsg2'));
      }

      if (data && data.error === 'email exists') {
        setInfoMsg(t('signup.infoMsg3'));
      }
    })
    .catch((e) => console.error(e))
  };

  return (
    <div className="login-grid-container">
      { infoMsg && <FlashMessage msg={infoMsg} /> }
      <div className="login-form-container">
        <form onSubmit={(e) => handleSignup(e)} autoComplete="off">
          <div className="login-input-container">
            <input
              type="text"
              placeholder={t('signup.placeholder1')}
              name="username"
              value={username}
              required
              minLength="3"
              maxLength="25"
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="email"
              placeholder={t('signup.placeholder2')}
              name="email"
              value={email}
              required
              minLength="6"
              maxLength="40"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder={t('signup.placeholder3')}
              name="password"
              value={password}
              required
              minLength="8"
              maxLength="255"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder={t('signup.placeholder4')}
              name="confirm-password"
              value={confirmPassword}
              required
              minLength="8"
              maxLength="255"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <input
              type="text"
              placeholder={t('signup.placeholder5')}
              name="firstname"
              value={firstname}
              required
              maxLength="50"
              onChange={(e) => setFirstname(e.target.value)}
            />
            <input
              type="text"
              placeholder={t('signup.placeholder6')}
              name="lastname"
              value={lastname}
              maxLength="50"
              onChange={(e) => setLastname(e.target.value)}
            />
          </div>
          <div className="login-btn-container">
            <input value={t('signup.button')} id="submit" type="submit" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewAccount;
