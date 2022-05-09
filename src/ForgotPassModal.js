import { useState } from 'react';
import { HiX } from 'react-icons/hi';
import ReactDOM from 'react-dom';

const ForgotPassModal = ({openModal, closeModal, t}) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [error, setError] = useState(false);

  const handleReqCreds = (e) => {
    e.preventDefault();
    fetch("/api/reset/password", {
      method: 'POST',
      body: JSON.stringify({ username, email }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.status === 200) {
          setError(false)
          setInfoMsg(t('forgotPassword.infoMsg4'));
        }
        if (res.status === 409) {
          setError(true)
          return res.json();
        }
        if (res.status === 500) {
          setError(true)
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
        }
        if (!data.error) {
          setInfoMsg(t('forgotPassword.infoMsg3'));
        }
      })
      .catch((e) => console.error(e))
  };

  if (!openModal) return null;
  return ReactDOM.createPortal(
    <div
      className="forgot-pass-grid"
      onClick={() => closeModal(true)}>
      <div
        className="forgot-pass"
        onClick={(e) => e.stopPropagation()}>
        <div className="forgot-pass__header">
          {infoMsg &&
          <span
            className={"forgot-pass__header_" + (error ? 'failure' : 'success')}>
            {infoMsg}
          </span>}
          <button
            className="forgot-pass__close"
            onClick={() => closeModal(true)}>
            <HiX />
          </button>
        </div>
        <label htmlFor="username">{t('forgotPassword.label1')}</label>
        <input
          className="forgot-pass__input"
          type="text"
          name="username"
          placeholder={t('forgotPassword.placeholder1')}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="forgot-pass__input"
          type="email"
          name="email"
          placeholder={t('forgotPassword.placeholder2')}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="forgot-pass__input forgot-pass__submit"
          type="submit"
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
