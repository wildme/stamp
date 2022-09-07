import { useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FlashMessage from './FlashMessage.js';
import ForgotPassModal from './ForgotPassModal.js';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const { t } = useTranslation();
  const [openModal, setOpenModal] = useState(false);

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { from } = location.state || { from: { pathname: "/" } }; ;

  const handleLogin = (e) => {
    e.preventDefault();
    const url = "/api/login";
    if (error) setError(false);

    fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 500) {
          setError(true);
          setInfoMsg({str: t('login.infoMsg2'), id: Math.random()});
        }
        if (res.status === 401) {
          setInfoMsg({str: t('login.infoMsg1'), id: Math.random()});
        }
      })
      .then(data => {
        if (data) {
          dispatch({ type: 'TOKEN', payload:
            { token: { string: data.token } }
          });
          dispatch({ type: 'LOGIN', payload:
            { user: { username: data.user.username,
              admin: data.user.admin, loggedIn: true }}
          });
          dispatch({ type: 'INFO', payload:
            { info: { fullname:  data.user.fullname,
              email: data.user.email }}
          });
          dispatch({ type: 'SETTINGS', payload:
            { settings: data.settings }
          });
        if (!error) history.replace(from);
        }
      })
      .catch((e) => console.error(e))
  };

  return (
    <div className="login-grid">
      { infoMsg.str && <FlashMessage msg={infoMsg.str} id={infoMsg.id} /> }
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="login-form">
          <input
            className="login-form__input"
            type="text"
            placeholder={t('login.placeholder1')}
            name="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            className="login-form__input"
            type="password"
            placeholder={t('login.placeholder2')}
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            className="login-form__input login-form__submit"
            value={t('login.button')}
            type="submit"
          />
          <span className="login-form__bottom-msg">{t('login.string')}&nbsp;
            <Link to="/signup">{t('login.link')}</Link>
          </span>
          <span className="login-form__bottom-msg">{t('login.string2')}&nbsp;
            <button
              className="login-form__bottom-msg login-form__button"
              type="button"
              onClick={() => setOpenModal(true)}>{t('login.button2')}
            </button>?
          </span>
        </div>
      </form>
      <ForgotPassModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
        t={t}
      />
    </div>
  );
};

export default Login;
