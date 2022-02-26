import { useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FlashMessage from './FlashMessage.js'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [infoMsg, setInfoMsg] = useState('');
  const { t } = useTranslation();

  const dispatch = useDispatch();
  const location = useLocation();
  const history = useHistory();

  const { from } = location.state || { from: { pathname: "/" } }; ;

  const handleLogin = (e) => {
    e.preventDefault();
    if (infoMsg) setInfoMsg('');
    if (error) setError(false);

    fetch("/api/login", {
      method: 'POST',
      body: JSON.stringify({ username, password }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.status === 200) return res.json();
        if (res.status === 500) {
          setError(true);
          setInfoMsg(t('login.infoMsg2'));
        }
        if (res.status === 401) {
          setInfoMsg(t('login.infoMsg1'));
        }
      })
      .then(data => {
        if (data) {
          dispatch({ type: 'TOKEN', payload: { token: { string: data.token } }});
          dispatch({ type: 'LOGIN', payload:
            { user: { username: data.user.username,
              admin: data.user.admin, loggedIn: true }}
          });
        if (!error) history.replace(from);
        }
      })
      .catch((e) => console.error(e))
  };

  return (
    <div className="login-grid-container">
      { infoMsg && <FlashMessage msg={infoMsg} /> }
      <div className="login-form-container">
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
          </div>
          <div className="login-btn-container">
              <input value={t('login.button')} id="submit" type="submit" />
          </div>
        </form>
      <div className="login-signup-msg">{t('login.string')}
        <Link to="/signup">{t('login.link')}</Link>
      </div>
      </div>
    </div>
  );
};

export default Login;
