import { useState } from 'react';
import { HiEyeOff, HiEye } from 'react-icons/hi';

const Password = ({user, t, setter}) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPassNew, setShowPassNew] = useState(false);
  const [showPassRepeat, setShowPassRepeat] = useState(false);

  const handleOldPass = (e) => {
    setOldPass(e.target.value);
  };

  const handleNewPass = (e) => {
    setNewPass(e.target.value);
  };

  const handleConfirmPass = (e) => {
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
    setter('');
    if (newPass !== confirmPass) {
      setter(t('password.infoMsg1'));
      return;
    }

    fetch("/api/user/update/password", {
      method: 'POST',
      body: JSON.stringify({user, oldPass, newPass}),
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        if (res.status === 500) setter(t('password.infoMsg2'));
        if (res.status === 409) setter(t('password.infoMsg3'));
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
          <label htmlFor="old-pass"><b>{ t('password.label1') }</b></label>
          <input
            type="password"
            name="old-pass"
            value={oldPass}
            required
            onChange={(e) => handleOldPass(e)}
          />
          <label htmlFor="new-pass"><b>{ t('password.label2') }</b></label>
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
          <input
            type="submit"
            id="submit"
            value={ t('password.button') }
            disabled={!oldPass || !newPass || !confirmPass}
          />
        </div>
      </form>
    </div>
  );
};

export default Password;
