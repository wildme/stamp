import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputAttrs as attrs } from './InputAttrs.js';
import InputField from './InputField.js';
import PasswordInputEye from './PasswordInputEye.js';
import SubmitButton from './SubmitButton.js';

const UserPassword = ({ setter }) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const user = useSelector((state) => state.user.username);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handlePassUpdate = () => {
    const url = "/api/user/update/password";
    const token = localStorage.getItem('at');
    if (newPass === confirmPass) {
      fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({user, oldPass, newPass})
      })
        .then(res => {
          if (res.status === 200) {
            if (res.token) {
              localStorage.setItem('at', res.token);
            }
            setter({str: t('password.infoMsg4'), id: Math.random(), type: 'success'});
          }
          if (res.status === 401) {
            dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
          }
          if (res.status === 409) {
            setter({str: t('password.infoMsg3'), id: Math.random()});
          }
          if (res.status === 500) {
            setter({str: t('password.infoMsg2'), id: Math.random()});
          }
        })
        .catch((e) => console.error(e))
    } else {
      setter({str: t('password.infoMsg1'), id: Math.random()});
    }
  };

  return (
    <div className="user-info-grid">
      <div className="user-info__title">
        <h2 className="user-info__title_section">{t('password.title')}</h2>
      </div>
      <InputField
        attrs={attrs['userProfile'].find(x => x.name === 'old-pass')}
        setter={setOldPass}
        value={oldPass}
        inputClassName="user-info__input"
        labelClassName="user-info__label"
      />
      <PasswordInputEye
        className="user-info-password"
        labelText={t('password.label2')}
        value={newPass}
        setter={setNewPass}
        title={t('passwordInputEye.tooltip')}
        name="new-pass"
      />
      <em className="user-info__hint">{t('password.string')}</em>
      <PasswordInputEye
        className="user-info-password"
        labelText={t('password.label3')}
        value={confirmPass}
        setter={setConfirmPass}
        title={t('passwordInputEye.tooltip')}
        name="confirm-pass"
      />
      <SubmitButton
        name={t('password.button')}
        className={"user-info__submit"}
        disabled={!oldPass || !newPass || !confirmPass}
        setter={handlePassUpdate}
      />
    </div>
  );
};

export default UserPassword;
