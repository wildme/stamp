import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      const url = "/api/signup";
      fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, firstname, lastname, email })
      })
        .then(res => {
          if (res.status === 409) {
            return res.json();
          }
          if (res.status === 201) {
            return 0;
          }
          if (res.status === 500) {
            return 1;
          }
        })
        .then(data => {
          if (data === 1) {
            setInfoMsg({str: t('signup.infoMsg4'), id: Math.random()});
          }
          if (data === 0) {
            setInfoMsg({str: t('signup.infoMsg5'), id: Math.random(), type: 'success'});
            setTimeout(() => { navigate('/login', { replace: true }); }, 3000);
          }
          if (data.error) {
            if (data.error === 'user exists') {
              setInfoMsg({str: t('signup.infoMsg2'), id: Math.random()});
            }
            if (data.error === 'email exists') {
              setInfoMsg({str: t('signup.infoMsg3'), id: Math.random()});
            }
          }
        })
        .catch((e) => console.error(e))
    } else {
      setInfoMsg({str: t('signup.infoMsg1'), id: Math.random()});
    }
  };

  return (
    <div className="signup-grid">
      {infoMsg.str &&
          <FlashMessage msg={infoMsg.str} id={infoMsg.id} type={infoMsg.type} />}
      <form onSubmit={(e) => handleSignup(e)}>
        <div className="signup-form signup-grid__signup-form">
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
            className="signup-form-password"
            value={password}
            setter={setPassword}
            placeHolder={t('signup.placeholder3')}
            title={t('passwordInputEye.tooltip')}
          />
          <em className="signup-form__length-hint">{t('signup.string')}</em>
          <PasswordInputEye
            className="signup-form-password"
            value={confirmPassword}
            setter={setConfirmPassword}
            placeHolder={t('signup.placeholder4')}
            title={t('passwordInputEye.tooltip')}
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
            required
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
