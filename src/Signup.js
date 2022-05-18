import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import FlashMessage from './FlashMessage.js';
import PasswordInputEye from './PasswordInputEye.js';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const { t } = useTranslation();
  const history = useHistory();

  function cmpPass(pass1, pass2) {
    if (pass1 === pass2) return true;
    else return false;
  }
  const handleSignup = (e) => {
    e.preventDefault();
    const match = cmpPass(password, confirmPassword);

    if (match) {
      fetch("/api/signup", {
        method: 'POST',
        body: JSON.stringify({ username, password,
          firstname, lastname, email }),
        headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        if (res.status === 409) return res.json();
        if (res.status === 201) {
          setInfoMsg({str: t('signup.infoMsg5'), id: Math.random()});
          history.replace('/login');
        }
        if (res.status === 500) {
          setInfoMsg({str: t('signup.infoMsg4'), id: Math.random()});
        }
      })
      .then(data => {
        if (data && data.error === 'user exists') {
          setInfoMsg({str: t('signup.infoMsg2'), id: Math.random()});
        }

        if (data && data.error === 'email exists') {
          setInfoMsg({str: t('signup.infoMsg3'), id: Math.random()});
        }
      })
      .catch((e) => console.error(e))
    } else {
      setInfoMsg({str: t('signup.infoMsg1'), id: Math.random()});
    }
  };

  return (
    <div className="signup-grid">
      { infoMsg.str && <FlashMessage msg={infoMsg.str} id={infoMsg.id} /> }
      <form onSubmit={(e) => handleSignup(e)}>
        <div className="signup-form">
          <input
            className="signup-form__input"
            type="text"
            placeholder={t('signup.placeholder1')}
            name="username"
            value={username}
            required
            pattern="^[A-Za-z]\w+$"
            title={t('signup.tooltip1')}
            minLength="2"
            maxLength="25"
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="signup-form__input"
            type="email"
            placeholder={t('signup.placeholder2')}
            name="email"
            value={email}
            required
            minLength="6"
            maxLength="40"
            onChange={(e) => setEmail(e.target.value)}
          />
          <PasswordInputEye
            pass={password}
            setter={setPassword}
            placeholder={t('signup.placeholder3')}
            title={t('passwordInputEye.tooltip')}
            styles={{ marginTop: "8px", height: "40px" }}
          />
          <em className="signup-form__length-hint">{t('signup.string')}</em>
          <PasswordInputEye
            pass={confirmPassword}
            setter={setConfirmPassword}
            placeholder={t('signup.placeholder4')}
            title={t('passwordInputEye.tooltip')}
            styles={{ marginTop: "8px", height: "40px" }}
          />
          <input
            className="signup-form__input"
            type="text"
            placeholder={t('signup.placeholder5')}
            name="firstname"
            value={firstname}
            required
            maxLength="50"
            onChange={(e) => setFirstname(e.target.value)}
          />
          <input
            className="signup-form__input"
            type="text"
            placeholder={t('signup.placeholder6')}
            name="lastname"
            value={lastname}
            maxLength="50"
            onChange={(e) => setLastname(e.target.value)}
          />
          <input
            className="signup-form__input signup-form__submit"
            value={t('signup.button')}
            type="submit"
          />
        </div>
      </form>
    </div>
  );
};

export default Signup;
