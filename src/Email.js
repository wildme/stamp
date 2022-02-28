import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const Email = ({ user, email, setter }) => {
  const [infoMsg, setInfoMsg] = useState('');
  const { t } = useTranslation();

  const handleEmailChange = (e) => {
    setter(e.target.value);
};

const handleEmailUpdate = (e) => {
  e.preventDefault();
  fetch("/api/user/update/email", {
    method: 'POST',
    body: JSON.stringify({user, email}),
    headers: {'Content-Type': 'application/json'}
  })
    .then(res => {
      if (res.status === 500) setInfoMsg(t('email.label1'));
      if (res.status === 409) setInfoMsg(t('email.label2'));
    })
    .catch((e) => console.error(e))
};

  return (
    <div className="user-info-grid-container">
      <div className="user-info-title-container">
        <h2>{ t('email.title') }</h2>
      </div>
      <div className="user-info-input-container">
        <label htmlFor="email"><b>{ t('email.label1') }</b></label>
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => handleEmailChange(e)}
        />
      </div>
      {infoMsg && <div className="user-info-msg">{infoMsg}</div>}
      <div className="user-info-update-btn-container">
        <button
          type="submit"
          disabled={!email}
          onClick={(e) => handleEmailUpdate(e)}>{ t('email.button') }
        </button>
      </div>
    </div>
  );
};
 export default Email;
