import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const PersonalInfo = ({ user, t }) => {
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [error, setError] = useState(false);
  const [infoMsg, setInfoMsg] = useState('');

  const dispatch = useDispatch();
  const state = useSelector((state) => state.user);

  const handleInfoUpdate = (e) => {
    e.preventDefault();
    fetch("/api/user/update/info", {
      method: 'POST',
      body: JSON.stringify({user, firstname, lastname}),
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        if (res.status === 200) {
          dispatch({ type: 'LOGIN', payload:
            { user: {...state,  fullname: [firstname, lastname].join(' ') }}});
        }
        if (res.status === 500) {
          setError(true);
          setInfoMsg(t('personalInfo.infoMsg'));
        }
      })
      .catch((e) => console.error(e))
  };

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    fetch(`/api/user/${user}`, { signal })
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(data => {
        setFirstname(data.firstname);
        setLastname(data.lastname);
      })
      .catch((e) => console.error(e))

    return () => { abortController.abort(); };
  }, []);

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
