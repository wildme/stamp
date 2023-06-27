import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import SubmitButton from './SubmitButton.js';

const UserSettings = ({ setter }) => {
  const user = useSelector((state) => state.user.username);
  const settings = useSelector((state) => state.settings);
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [sortOrder, setSortOrder] = useState(settings.sortOrder);

  const handleSettingsUpdate = () => {
    const url = "/api/user/update/settings";
    const token = localStorage.getItem('at');
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({user, settings: {sortOrder: sortOrder}})
    })
      .then(res => {
        if (res.status === 200) {
          if (res.token) {
            localStorage.setItem('at', res.token);
          }
          dispatch({ type: 'SETTINGS', payload: { settings: {...settings, sortOrder: sortOrder } } });
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
      >{t('userSettings.label1')}
      </label>
      <select
        className="user-info__select"
        name="sortOrder"
        value={sortOrder}
        onChange={(e) => setSortOrder(e.target.value)}
      >
        <option value="asc">{t('userSettings.optSort1')}</option>
        <option value="desc">{t('userSettings.optSort2')}</option>
      </select>
      <SubmitButton
        name={t('personalInfo.button')}
        className={"user-info__submit"}
        disabled={false}
        setter={handleSettingsUpdate}
      />
    </div>
  );
};

export default UserSettings;
