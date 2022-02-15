import { useState } from 'react';

const PersonalInfo = ({ user, firstname, lastname, setterF, setterL }) => {
  const [error, setError] = useState(false);
  const [infoMsg, setInfoMsg] = useState('');

  const handleFirstnameChange = (e) => {
    setterF(e.target.value);
  };

  const handleLastnameChange = (e) => {
    setterL(e.target.value);
  };

  const handleInfoUpdate = (e) => {
    e.preventDefault();
    fetch("/api/user/update/info", {
      method: 'POST',
      body: JSON.stringify({user, firstname, lastname}),
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        if (res.status === 500) {
          setError(true);
          setInfoMsg("Couldn't update user info");
        }
      })
      .catch((e) => console.error(e))
};

  return (
    <div className="user-info-grid-container">
      <div className="user-info-title-container">
        <h2>Change personal info</h2>
      </div>
      <div className="user-info-input-container">
        <label htmlFor="firstname"><b>Firstname</b></label>
        <input
          type="text"
          name="firstname"
          value={firstname}
          onChange={(e) => handleFirstnameChange(e)}
        />
        <label htmlFor="lastname"><b>Lastname</b></label>
        <input
          type="text"
          name="lastname"
          value={lastname}
          onChange={(e) => handleLastnameChange(e)}
        />
      </div>
      <div className="user-info-update-btn-container">
        <button
          type="submit"
          disabled={!firstname}
          onClick={(e) => handleInfoUpdate(e)}>Change
        </button>
      </div>
    </div>
  );
};
 export default PersonalInfo;
