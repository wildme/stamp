import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

const Email = ({ user, t }) => {
  const [email, setEmail] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  const handleEmailUpdate = (e) => {
    e.preventDefault();
    fetch("/api/user/update/email", {
      method: 'POST',
      body: JSON.stringify({user, email}),
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        if (res.status === 500) setInfoMsg(t('email.infoMsg1'));
        if (res.status === 409) setInfoMsg(t('email.infoMsg2'));
      })
      .catch((e) => console.error(e))
  };
  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    fetch(`/api/user/${user}`, { signal })
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(data => {
        setEmail(data.email);
      })
      .catch((e) => console.error(e))

    return () => { abortController.abort(); };
  }, []);

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
          required
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      { infoMsg &&
      <div className="user-info-msg">{infoMsg}</div>
      }
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
