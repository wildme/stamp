import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserInfo = ({ user, name1, name2, t, setter }) => {
  const [firstname, setFirstname] = useState(name1);
  const [lastname, setLastname] = useState(name2);

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
          setter({
            str: t('personalInfo.infoMsg2'),
            id: Math.random(),
            type: 'success'
          });
        }
        if (res.status === 500) {
          setter({str: t('personalInfo.infoMsg1'), id: Math.random()});
        }
      })
      .catch((e) => console.error(e))
  };

  return (
    <div className="user-info-grid">
      <div className="user-info__title">
        <h2 className="user-info__title_section">{t('personalInfo.title')}</h2>
      </div>
      <label
        htmlFor="firstname"
        className="user-info__label"
      ><b>{t('personalInfo.label1')}</b>
      </label>
      <input
        className="user-info__input"
        type="text"
        name="firstname"
        value={firstname}
        required
        onChange={(e) => setFirstname(e.target.value)}
      />
      <label
        htmlFor="lastname"
        className="user-info__label"
      ><b>{t('personalInfo.label2')}</b>
      </label>
      <input
        className="user-info__input"
        type="text"
        name="lastname"
        value={lastname}
        onChange={(e) => setLastname(e.target.value)}
      />
      <button
        className="user-info__submit"
        type="submit"
        disabled={!firstname}
        onClick={(e) => handleInfoUpdate(e)}>{t('personalInfo.button')}
      </button>
    </div>
  );
};
 export default UserInfo;
