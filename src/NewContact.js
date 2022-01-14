import { useState } from 'react';
import { useHistory  } from 'react-router-dom';
import { InputAttrs as attrs } from './InputAttrs.js';
import InputField from './InputFields.js';

const NewContact = () => {
  const [orgLocation, setOrgLocation] = useState('');
  const [orgRegion, setOrgRegion] = useState('');
  const [orgName, setOrgName] = useState('');
  const history = useHistory();

  const handleAddContact = (e) => {
    e.preventDefault();
    fetch('/api/contacts/new', {
      method: 'POST',
      body: JSON.stringify({ orgLocation, orgRegion, orgName }),
      headers: {'Content-Type': 'application/json'}
    })
    .then(res => {
      if (res.status < 200 || res.status > 299) {
        return alert('Error occured! Try again.');
      }
    })
    setOrgLocation('');
    setOrgRegion('');
    setOrgName('');
    history.replace('/contacts');
  };

  return (
     <div className="add-record">
       <div className="record-input">
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
         <InputField
           attrs={attrs['contact'].filter((x) => x.name === 'name')[0]}
           setter={setOrgName}
           value={orgName}
         /> 
         <button type="submit" disabled={!orgName || !orgLocation} onClick={(e) => handleAddContact(e)}>
          Add
         </button> 
       </div>
     </div>
  );
};

export default NewContact;
