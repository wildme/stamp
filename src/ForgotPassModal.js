import { useState } from 'react';
import { HiX } from 'react-icons/hi';
import ReactDOM from 'react-dom';

const ForgotPassModal = ({openModal, closeModal, t}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [infoMsg, setInfoMsg] = useState('');

  const handleReqCreds = (e) => {
    e.preventDefault();
    fetch("/api/reset/password", {
      method: 'POST',
      body: JSON.stringify({ username, email }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.status === 200) {
          setInfoMsg(t('forgotPassword.infoMsg4'));
        }
        if (res.status === 409) {
          return res.json();
        }
        if (res.status === 500) {
          return res.json();
        }
      })
      .then(data => {
        if (data.error === 'User not found') {
          setInfoMsg(t('forgotPassword.infoMsg1'))
        }
        if (data.error === 'Email not found') {
          setInfoMsg(t('forgotPassword.infoMsg2'))
        }
        if (data.error === 'Cannot send email') {
          setInfoMsg(t('forgotPassword.infoMsg5'))
        } else {
          setInfoMsg(t('forgotPassword.infoMsg3'));
        }
      })
      .catch((e) => console.error(e))
  };

  if (!openModal) return null;
  return ReactDOM.createPortal(
    <div
      className="forgot-pass-grid-container"
      onClick={() => closeModal(true)}>
      <div
        className="forgot-pass-input-container"
        onClick={(e) => e.stopPropagation()}>
        <div className="forgot-pass-header">
          {infoMsg && <span>{infoMsg}</span>}
          <button onClick={() => closeModal(true)}><HiX /></button>
        </div>
        <label htmlFor="username"><b>{t('forgotPassword.label1')}</b></label>
        <input
          type="text"
          name="username"
          placeholder={t('forgotPassword.placeholder1')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder={t('forgotPassword.placeholder2')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="submit"
          id="submit"
          value={t('forgotPassword.button1')}
          disabled={!email || !username}
          onClick={(e) => handleReqCreds(e)}
        />
      </div>
    </div>,
    document.body
  );
};

export default ForgotPassModal;
