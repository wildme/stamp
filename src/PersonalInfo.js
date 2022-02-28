import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const PersonalInfo = ({ user, firstname, lastname, setterF, setterL }) => {
  const [error, setError] = useState(false);
  const [infoMsg, setInfoMsg] = useState('');
  const { t } = useTranslation();

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
          setInfoMsg(t('personalInfo.infoMsg'));
        }
      })
      .catch((e) => console.error(e))
};

  return (
    <div className="user-info-grid-container">
      <div className="user-info-title-container">
        <h2>{ t('personalInfo.title') }</h2>
      </div>
      <div className="user-info-input-container">
        <label htmlFor="firstname"><b>{ t('personalInfo.label1') }</b></label>
        <input
          type="text"
          name="firstname"
          value={firstname}
          onChange={(e) => handleFirstnameChange(e)}
        />
        <label htmlFor="lastname"><b>{ t('personalInfo.label2') }</b></label>
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
          onClick={(e) => handleInfoUpdate(e)}>{ t('personalInfo.button') }
        </button>
      </div>
    </div>
  );
};
 export default PersonalInfo;
