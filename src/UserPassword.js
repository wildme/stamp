import { useState } from 'react';
import PasswordInputEye from './PasswordInputEye.js';

const UserPassword = ({user, t, setter, setter2}) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  function cmpPass(pass1, pass2) {
    if (pass1 === pass2) return true;
    else return false;
  }

  const handlePassUpdate = (e) => {
    e.preventDefault()
    let match = cmpPass(newPass, confirmPass);
    if (match) {
      fetch("/api/user/update/password", {
        method: 'POST',
        body: JSON.stringify({user, oldPass, newPass}),
        headers: {'Content-Type': 'application/json'}
      })
        .then(res => {
          if (res.status === 200) {
            setter({
              str: t('password.infoMsg4'),
              id: Math.random(),
              type: 'success'
            });
          }
          if (res.status === 500) {
            setter({str: t('password.infoMsg2'), id: Math.random()});
          }
          if (res.status === 409) {
            setter({str: t('password.infoMsg3'), id: Math.random()});
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
      <label
        htmlFor="old-pass"
        className="user-info__label"
      ><b>{t('password.label1')}</b>
      </label>
      <input
        className="user-info__input"
        type="password"
        name="old-pass"
        value={oldPass}
        required
        onChange={(e) => setOldPass(e.target.value)}
      />
      <label
        htmlFor="new-pass"
        className="user-info__label"
      ><b>{t('password.label2')}</b>
      </label>
      <PasswordInputEye
        pass={newPass}
        setter={setNewPass}
        title={t('passwordInputEye.tooltip')}
        name="new-pass"
        styles={{ height: "30px" }}
      />
      <em className="user-info__hint">{t('password.string')}</em>
      <label
        htmlFor="confirm-pass"
        className="user-info__label"
      ><b>{t('password.label3')}</b>
      </label>
      <PasswordInputEye
        pass={confirmPass}
        setter={setConfirmPass}
        title={t('passwordInputEye.tooltip')}
        name="confirm-pass"
        styles={{ height: "30px" }}
      />
      <input
        className="user-info__submit"
        type="submit"
        value={ t('password.button') }
        disabled={!oldPass || !newPass || !confirmPass}
        onClick={(e) => handlePassUpdate(e)}
      />
    </div>
  );
};

export default UserPassword;
