import { useState } from 'react';
import { HiEyeOff, HiEye } from 'react-icons/hi';

const Password = ({user, t}) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPassNew, setShowPassNew] = useState(false);
  const [showPassRepeat, setShowPassRepeat] = useState(false);
  const [infoMsg, setInfoMsg] = useState('');
  const [oldPassInfo, setOldPassInfo] = useState('');
  const [newPassInfo, setNewPassInfo] = useState('');

  const handleOldPass = (e) => {
    setOldPassInfo("");
    setOldPass(e.target.value);
  };

  const handleNewPass = (e) => {
    setNewPassInfo("");
    setNewPass(e.target.value);
  };

  const handleConfirmPass = (e) => {
    setNewPassInfo("");
    setConfirmPass(e.target.value);
  };

  const handleShowPassNew = (e) => {
    e.preventDefault()
    setShowPassNew(!showPassNew);
  };

  const handleShowPassRepeat = (e) => {
    e.preventDefault()
    setShowPassRepeat(!showPassRepeat);
  };

  const handlePassUpdate = (e) => {
    e.preventDefault();

    if (newPass !== confirmPass) {
      setNewPassInfo(t('password.infoMsg1'));
      return;
    }

    fetch("/api/user/update/password", {
      method: 'POST',
      body: JSON.stringify({user, oldPass, newPass}),
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        if (res.status === 500) setInfoMsg(t('password.infoMsg2'));
        if (res.status === 409) setOldPassInfo(t('password.infoMsg3'));
      })
      .catch((e) => console.error(e))
  };

  return (
    <div className="user-info-grid-container">
      <div className="user-info-title-container">
        <h2>{ t('password.title') }</h2>
      </div>
      <form onSubmit={(e) => handlePassUpdate(e)} autoComplete="off">
        <div className="user-info-input-container">
          <label htmlFor="old-pass"><b>{ t('password.label1') }</b>
            { oldPassInfo &&
              <span className="user-info-msg"> {oldPassInfo}</span>
            }
          </label>
          <input
            type="password"
            name="old-pass"
            value={oldPass}
            required
            onChange={(e) => handleOldPass(e)}
          />
          <label htmlFor="new-pass"><b>{ t('password.label2') }</b>
            { newPassInfo &&
              <span className="user-info-msg"> {newPassInfo}</span>
            }
          </label>
          <div className="user-info-pass-container">
            <input
              type={showPassNew ? "text" : "password"}
              id="pass"
              name="new-pass"
              value={newPass}
              required
              onChange={(e) => handleNewPass(e)}
            />
            <button id="pass"
              onClick={(e) => handleShowPassNew(e)}>
              { showPassNew ? <HiEye /> : <HiEyeOff /> }
            </button>
          </div>
          <label htmlFor="confirm-pass"><b>{ t('password.label3') }</b></label>
          <div className="user-info-pass-container">
            <input
              type={showPassRepeat ? "text" : "password"}
              id="pass"
              name="confirm-pass"
              value={confirmPass}
              required
              onChange={(e) => handleConfirmPass(e)}
            />
            <button id="pass"
              onClick={(e) => handleShowPassRepeat(e)}>
                { showPassRepeat ? <HiEye /> : <HiEyeOff /> }
            </button>
          </div>
        </div>
        <div className="user-info-update-btn-container">
          <input value={ t('password.button') } id="submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Password;
