import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import InputField from './InputField.js';
import SubmitButton from './SubmitButton.js';
import { InputAttrs as attrs } from './InputAttrs.js';

const UserInfo = ({ user, name1, name2, t, setter }) => {
  const [firstname, setFirstname] = useState(name1);
  const [lastname, setLastname] = useState(name2);
  const state = useSelector((state) => state.info);
  const dispatch = useDispatch();

  const handleInfoUpdate = () => {
    const url = "/api/user/update/info";
    const token = localStorage.getItem('at');
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({user, firstname, lastname})
    })
      .then(res => {
        if (res.status === 200) {
          if (res.token) {
            localStorage.setItem('at', res.token);
          }
          dispatch({ type: 'INFO',
            payload: { info: {...state,  fullname: [firstname, lastname].join(' ') }}
          });
          setter({str: t('personalInfo.infoMsg2'), id: Math.random(), type: 'success'});
        }
        if (res.status === 401) {
          dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
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
      <InputField
        id="user-profile"
        attrs={attrs['userProfile'].filter((x) => x.name === "firstname")[0]}
        setter={setFirstname}
        value={firstname}
        inputClassName="user-info__input"
        labelClassName="user-info__label"
      />
      <InputField
        id="user-profile"
        attrs={attrs['userProfile'].filter((x) => x.name === "lastname")[0]}
        setter={setLastname}
        value={lastname}
        inputClassName="user-info__input"
        labelClassName="user-info__label"
      />
      <SubmitButton
        name={t('personalInfo.button')}
        className={"user-info__submit"}
        disabled={!firstname}
        setter={handleInfoUpdate}
      />
    </div>
  );
};

export default UserInfo;
