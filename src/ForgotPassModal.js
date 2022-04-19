import { useState } from 'react';
import { HiX } from 'react-icons/hi';
import ReactDOM from 'react-dom';

const ForgotPassModal = ({openModal, closeModal}) => {
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
          setInfoMsg("Check your mailbox");
        }
        if (res.status === 204) {
          return res.json();
        }
        if (res.status === 500) {
          setInfoMsg("Error occured");
        }
      })
      .then(data => setInfoMsg(data.info))
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
          <button onClick={() => closeModal(true)}><HiX /></button>
        </div>
        <label htmlFor="username"><b>Reset password?</b></label>
        <input
          type="text"
          name="username"
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="submit"
          id="submit"
          value="Send"
          disabled={!email || !username}
          onClick={(e) => handleReqCreds(e)}
        />
      </div>
    </div>,
    document.body
  );
};

export default ForgotPassModal;
