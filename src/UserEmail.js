import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import InputField from './InputField.js';
import SubmitButton from './SubmitButton.js';
import { InputAttrs as attrs } from './InputAttrs.js';

const UserEmail = ({ user, setter }) => {
  const state = useSelector((state) => state.info);
  const [email, setEmail] = useState(state.email);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleEmailUpdate = () => {
    if (email === state.email) return;
    const url = "/api/user/update/email";
    const token = localStorage.getItem('at');

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
            localStorage.setItem('at', res.token);
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
      <InputField
        attrs={attrs['userProfile'].find(x => x.name === "email")}
        setter={setEmail}
        value={email}
        inputClassName="user-info__input"
        labelClassName="user-info__label"
      />
      <SubmitButton
        name={t('email.button')}
        className={"user-info__submit"}
        disabled={!email}
        setter={handleEmailUpdate}
      />
    </div>
  );
};

export default UserEmail;
