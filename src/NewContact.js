import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputAttrs as attrs } from './InputAttrs.js';
import InputField from './InputField.js';
import FlashMessage from './FlashMessage.js'

const NewContact = () => {
  const [orgLocation, setOrgLocation] = useState('');
  const [orgRegion, setOrgRegion] = useState('');
  const [orgName, setOrgName] = useState('');
  const [error, setError] = useState(false);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const handleAddContact = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('at');
    const url = '/api/contacts/new';
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ orgLocation, orgRegion, orgName })
    })
    .then(res => {
      if (res.status === 200) {
        if (res.token) {
          localStorage.setItem('at', res.token);
        }
      }
      if (res.status === 401) {
        dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
      }
      if (res.status === 500) {
        setError(true);
        setInfoMsg({str: t('newContact.infoMsg'), id: Math.random()});
      }
    })
    .catch(err => console.error(err))

    if (!error) {
      setOrgLocation('');
      setOrgRegion('');
      setOrgName('');
    }
  };

  return (
     <div className="add-contact-grid">
       { infoMsg.str && <FlashMessage msg={infoMsg.str} id={infoMsg.id} /> }
       <div className="add-contact add-contact-grid__add-contact">
         <InputField
           attrs={attrs['contact'].filter((x) => x.name === 'name')[0]}
           setter={setOrgName}
           value={orgName}
           inputClassName="add-contact__input"
           labelClassName="add-contact__label"
         />
         <InputField
           attrs={attrs['contact'].filter((x) => x.name === 'location')[0]}
           setter={setOrgLocation}
           value={orgLocation}
           inputClassName="add-contact__input"
           labelClassName="add-contact__label"
         />
         <InputField
           attrs={attrs['contact'].filter((x) => x.name === 'region')[0]}
           setter={setOrgRegion}
           value={orgRegion}
           inputClassName="add-contact__input"
           labelClassName="add-contact__label"
         />
         <button
           className="add-contact__submit"
           type="submit"
           disabled={!orgName || !orgLocation}
           onClick={(e) => handleAddContact(e)}>
           { t('newContact.button') }
         </button>
       </div>
     </div>
  );
};

export default NewContact;
