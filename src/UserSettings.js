import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserSettings = ({ user, t, setter, settings }) => {
  const [sortOrder, setSortOrder] = useState({
    records: { sortOrder: settings.records.sortOrder }
  });
  const token = useSelector((state) => state.token.string);
  const state = useSelector((state) => state.settings);
  const dispatch = useDispatch();

  const handleSettingsUpdate = (e) => {
    e.preventDefault();
    const url = "/api/user/update/settings";
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({user, settings: {...sortOrder}})
    })
      .then(res => {
        if (res.status === 200) {
          if (res.token) {
            dispatch({ type: 'TOKEN', payload: { token: { string: res.token } }});
          }
          dispatch({ type: 'SETTINGS', payload: { settings: {...state, ...sortOrder } }});
          setter({str: t('userSettings.infoMsg1'), id: Math.random(), type: 'success'});
        }
        if (res.status === 500) {
          setter({str: t('userSettings.infoMsg2'), id: Math.random()});
        }
      })
      .catch((e) => console.error(e))
  };

  return (
    <div className="user-info-grid">
      <div className="user-info__title">
        <h2 className="user-info__title_section">{t('userSettings.title')}</h2>
      </div>
      <label
        htmlFor="sortOrder"
        className="user-info__label"
      ><b>{t('userSettings.label1')}</b>
      </label>
      <select
        className="user-info__select"
        name="sortOrder"
        value={sortOrder.records.sortOrder}
        onChange={(e) => setSortOrder({records: { sortOrder: e.target.value }})}
      >
        <option value="asc">{t('userSettings.optSort1')}</option>
        <option value="desc">{t('userSettings.optSort2')}</option>
      </select>
      <button
        className="user-info__submit"
        type="submit"
        onClick={(e) => handleSettingsUpdate(e)}>{t('personalInfo.button')}
      </button>
    </div>
  );
};

export default UserSettings;
