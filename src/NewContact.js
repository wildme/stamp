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
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
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
        setInfoMsg({str: t('newContact.infoMsg'), id: Math.random()});
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
     <div className="add-contact-grid">
       { infoMsg.str && <FlashMessage msg={infoMsg.str} id={infoMsg.id} /> }
       <div className="add-contact">
         <InputField
           attrs={attrs['contact'].filter((x) => x.name === 'name')[0]}
           setter={setOrgName}
           value={orgName}
           className="add-contact__input"
         />
         <InputField
           attrs={attrs['contact'].filter((x) => x.name === 'location')[0]}
           setter={setOrgLocation}
           value={orgLocation}
           className="add-contact__input"
         />
         <InputField
           attrs={attrs['contact'].filter((x) => x.name === 'region')[0]}
           setter={setOrgRegion}
           value={orgRegion}
           className="add-contact__input"
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
