import { useState } from 'react';
import { useParams, useHistory  } from 'react-router-dom';
import { InputAttrs as attrs } from './InputAttrs.js';
import InputField from './InputFields.js';
import { useSelector } from 'react-redux';

const NewRecord = () => {
  const { box } = useParams();
  const [subject, setSubject] = useState('');
  const [fromTo, setFromTo] = useState('');
  const addedBy = useSelector((state) => state.user.username);
  const [notes, setNotes] = useState('');
  const history = useHistory();

  const handleAddRecord = (e) => {
    e.preventDefault();
    fetch(`/api/${box}/new`, {
      method: 'POST',
      body: JSON.stringify({ subject , fromTo, addedBy, notes}),
      headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        if (!res.ok) throw new Error('Network issue occured');
      })
      .catch(err => console.error(err))

    setSubject('');
    setFromTo('');
    setNotes('');
    history.replace(`/${box}`);
  };

  return (
    <div className="add-record">
      <div className="record-input">
        <InputField
          attrs={attrs[`${box}`].filter((x) => x.name === 'subj')[0]}
          setter={setSubject}
          value={subject}
        />
        <InputField
          attrs={
            attrs[`${box}`].filter((x) => x.name === 'from' || x.name === 'to')[0]
          }
          setter={setFromTo}
          value={fromTo}
          auto={true}
          field='name'
        />
        <InputField
          attrs={attrs[`${box}`].filter((x) => x.name === 'note')[0]}
          setter={setNotes}
          value={notes}
        />
        <button type="submit" disabled={!subject || !fromTo} onClick={(e) => handleAddRecord(e)}>
          Add
        </button>
      </div>
    </div>
  );
};

export default NewRecord;
