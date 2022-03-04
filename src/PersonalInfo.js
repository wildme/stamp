import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PersonalInfo = ({ user, name1, name2, t }) => {
  const [firstname, setFirstname] = useState(name1);
  const [lastname, setLastname] = useState(name2);
  const [infoMsg, setInfoMsg] = useState('');

  const dispatch = useDispatch();
  const state = useSelector((state) => state.info);

  const handleInfoUpdate = (e) => {
    e.preventDefault();
    fetch("/api/user/update/info", {
      method: 'POST',
      body: JSON.stringify({user, firstname, lastname}),
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: 'INFO', payload:
            { info: {...state,  fullname: [firstname, lastname].join(' ') } }
          });
        }
        if (res.status === 500) {
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
          required
          onChange={(e) => setFirstname(e.target.value)}
        />
        <label htmlFor="lastname"><b>{ t('personalInfo.label2') }</b></label>
        <input
          type="text"
          name="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
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
