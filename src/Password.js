import { useState } from 'react';

const Password = () => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handleOldPass = (e) => {
    setOldPass(e.target.value);
  };

  const handleNewPass = (e) => {
    setNewPass(e.target.value);
  };

  const handleConfirmPass = (e) => {
    setConfirmPass(e.target.value);
  }
  const handlePassUpdate = (e) => {
    e.preventDefault();
    return;
};
  return (
    <div className="user-info-grid-container">
      <div className="user-info-title-container">
        <h2>Change password</h2>
      </div>
      <form onSubmit={(e) => handlePassUpdate(e)} autoComplete="off">
        <div className="user-info-input-container">
          <label htmlFor="old-pass"><b>Old password</b></label>
          <input
            type="password"
            name="old-pass"
            value={oldPass}
            required
            onChange={(e) => handleOldPass(e)}
          />
          <label htmlFor="new-pass"><b>New password</b></label>
          <input
            type="password"
            name="new-pass"
            value={newPass}
            required
            onChange={(e) => handleNewPass(e)}
          />
          <label htmlFor="confirm-pass"><b>Confirm password</b></label>
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
