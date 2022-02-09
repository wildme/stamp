import { useState } from 'react';

const Password = ({user}) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleOldPass = (e) => {
    setErrorMsg("");
    setOldPass(e.target.value);
  };

  const handleNewPass = (e) => {
    setInfoMsg("");
    setNewPass(e.target.value);
  };

  const handleConfirmPass = (e) => {
    setInfoMsg("");
    setConfirmPass(e.target.value);
  }
  const handlePassUpdate = (e) => {
    e.preventDefault();
    if (newPass !== confirmPass) {
      setInfoMsg("passwords do not match");
      return;
    }

    fetch("/api/user/update/password", {
      method: 'POST',
      body: JSON.stringify({user, oldPass, newPass}),
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        if (res.status === 409) setErrorMsg("wrong password");
      })
      .catch((e) => console.error(e))
};
  return (
    <div className="user-info-grid-container">
      <div className="user-info-title-container">
        <h2>Change password</h2>
      </div>
      <form onSubmit={(e) => handlePassUpdate(e)} autoComplete="off">
        <div className="user-info-input-container">
          <label htmlFor="old-pass"><b>Old password</b>
            {errorMsg && <span className="user-info-msg"> {errorMsg}</span>}
          </label>
          <input
            type="password"
            name="old-pass"
            value={oldPass}
            required
            onChange={(e) => handleOldPass(e)}
          />
          <label htmlFor="new-pass"><b>New password</b>
            {infoMsg && <span className="user-info-msg"> {infoMsg}</span>}
          </label>
          <input
            type="password"
            name="new-pass"
            value={newPass}
            required
            onChange={(e) => handleNewPass(e)}
          />
          <label htmlFor="confirm-pass"><b>Confirm new password</b></label>
          <input
            type="password"
            name="confirm-pass"
            value={confirmPass}
            required
            onChange={(e) => handleConfirmPass(e)}
          />
        </div>
        <div className="user-info-update-btn-container">
          <input value="Change" id="submit" type="submit" />
        </div>
      </form>
    </div>
  );
};

export default Password;
