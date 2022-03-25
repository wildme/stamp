import { useState } from 'react';
import { HiEyeOff, HiEye } from 'react-icons/hi';

const Password = ({user, t, setter, setter2}) => {
  const [oldPass, setOldPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [showPassNew, setShowPassNew] = useState(false);
  const [showPassRepeat, setShowPassRepeat] = useState(false);

  const handleShowPassNew = (e) => {
    e.preventDefault();
    setShowPassNew(!showPassNew);
  };

  const handleShowPassRepeat = (e) => {
    e.preventDefault();
    setShowPassRepeat(!showPassRepeat);
  };

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
    <div className="user-info-grid-container">
      <div className="user-info-title-container">
        <h2>{ t('password.title') }</h2>
      </div>
      <form onSubmit={(e) => handlePassUpdate(e)}>
        <div className="user-info-input-container">
          <label htmlFor="old-pass"><b>{ t('password.label1') }</b></label>
          <input
            type="password"
            name="old-pass"
            value={oldPass}
            required
            onChange={(e) => setOldPass(e.target.value)}
          />
          <label htmlFor="new-pass"><b>{ t('password.label2') }</b></label>
          <div className="user-info-pass-container">
            <input
              type={showPassNew ? "text" : "password"}
              id="pass"
              name="new-pass"
              value={newPass}
              required
              minLength="8"
              maxLength="255"
              onChange={(e) => setNewPass(e.target.value)}
            />
            <button
              id="pass"
              type="button"
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
              minLength="8"
              maxLength="255"
              onChange={(e) => setConfirmPass(e.target.value)}
            />
            <button
              id="pass"
              type="button"
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
