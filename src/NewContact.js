import { useState } from 'react';
import { useHistory  } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { InputAttrs as attrs } from './InputAttrs.js';
import InputField from './InputFields.js';
import FlashMessage from './FlashMessage.js'

const NewContact = () => {
  const [orgLocation, setOrgLocation] = useState('');
  const [orgRegion, setOrgRegion] = useState('');
  const [orgName, setOrgName] = useState('');
  const [error, setError] = useState(false);
  const [infoMsg, setInfoMsg] = useState('');
  const history = useHistory();
  const { t } = useTranslation();

  const handleAddContact = (e) => {
    e.preventDefault();
    fetch('/api/contacts/new', {
      method: 'POST',
      body: JSON.stringify({ orgLocation, orgRegion, orgName }),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      if (res.status === 500) {
        setError(true);
        setInfoMsg(t('newContact.infoMsg'));
      }
    })
    .catch(err => console.error(err))

    if (!error) {
      setOrgLocation('');
      setOrgRegion('');
      setOrgName('');
      history.replace('/contacts');
    }
  };

  return (
     <div className="add-contact-grid-container">
       { infoMsg && <FlashMessage msg={infoMsg} /> }
       <div className="contact-input">
         <InputField
           attrs={attrs['contact'].filter((x) => x.name === 'name')[0]}
           setter={setOrgName}
           value={orgName}
         />
         <InputField
           attrs={attrs['contact'].filter((x) => x.name === 'location')[0]}
           setter={setOrgLocation}
           value={orgLocation}
         />
         <InputField
           attrs={attrs['contact'].filter((x) => x.name === 'region')[0]}
           setter={setOrgRegion}
           value={orgRegion}
         />
         <button
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
