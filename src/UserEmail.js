import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserEmail = ({ user, t, setter }) => {
  const state = useSelector((state) => state.info);
  const [email, setEmail] = useState(state.email);
  const token = useSelector((state) => state.token.string);
  const dispatch = useDispatch();

  const handleEmailUpdate = (e) => {
    e.preventDefault();
    if (email === state.email) return;
    const url = "/api/user/update/email";

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({user, email})
    })
      .then(res => {
        if (res.status === 200) {
          if (res.token) {
            dispatch({ type: 'TOKEN', payload: { token: { string: res.token } }});
          }
          dispatch({ type: 'INFO', payload: { info: {...state,  email: email } }});
          setter({str: t('email.infoMsg3'), id: Math.random(), type: 'success'});
        }
        if (res.status === 401) {
          dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
        }
        if (res.status === 409) {
          setter({str: t('email.infoMsg2'), id: Math.random()});
        }
        if (res.status === 500) {
          setter({str: t('email.infoMsg1'), id: Math.random()});
        }
      })
      .catch((e) => console.error(e))
  };

  return (
    <div className="user-info-grid">
      <div className="user-info__title">
        <h2 className="user-info__title_section">{t('email.title')}</h2>
      </div>
      <label
        htmlFor="email"
        className="user-info__label"
      ><b>{t('email.label1')}</b>
      </label>
      <input
        className="user-info__input"
        type="email"
        name="email"
        value={email}
        required
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        className="user-info__submit"
        type="submit"
        disabled={!email}
        onClick={(e) => handleEmailUpdate(e)}>{t('email.button')}
      </button>
    </div>
  );
};
 export default UserEmail;
