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
    if (error) setError(false);

    fetch("/api/login", {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
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
        if (!error) history.replace(from);
        }
      })
      .catch((e) => console.error(e))
  };

  return (
    <div className="login-grid-container">
      { infoMsg.str && <FlashMessage msg={infoMsg.str} id={infoMsg.id} /> }
      <form onSubmit={(e) => handleLogin(e)}>
        <div className="login-input-container">
          <input
            type="text"
            placeholder={t('login.placeholder1')}
            name="username"
            value={username}
            required
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder={t('login.placeholder2')}
            name="password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
          />
          <input value={t('login.button')} id="submit" type="submit" />
          <span className="login-bottom-msg">{t('login.string')}&nbsp;
            <Link to="/signup">{t('login.link')}</Link>
          </span>
          <span className="login-bottom-msg">Забыли&nbsp;
            <button
              type="button"
              onClick={() => setOpenModal(true)}>пароль
            </button>?
          </span>
        </div>
      </form>
      <ForgotPassModal
        openModal={openModal}
        closeModal={() => setOpenModal(false)}
      />
    </div>
  );
};

export default Login;
