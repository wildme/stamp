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
  const [note, setNote] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [file, setFile] = useState();
  const history = useHistory();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  }

  const handleAddRecord = async (e) => {
    e.preventDefault();

    const id = await fetch(`/api/${box}/new`, {
      method: 'POST',
      body: JSON.stringify({ subject, fromTo, addedBy, replyTo, note}),
      headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        if (res.ok) return res.json();
        if (!res.ok) throw new Error('Network issue occured');
      })
      .catch(err => console.error(err))

   if (file) {
     const formData = new FormData();
     formData.append('file', file);
     await fetch(`/api/${box}/upload/${id}`, {
       method: 'POST',
       body: formData,
       })
       .then(res => {
         if (!res.ok) throw new Error('Network issue occured');
       })
       .catch(err => console.error(err))
    }

    setSubject('');
    setFromTo('');
    setNote('');
    setReplyTo('');
    setFile('');
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
          attrs={attrs[`${box}`].filter((x) => x.name === 'replyTo')[0]}
          setter={setReplyTo}
          value={replyTo}
        />
        <InputField
          attrs={attrs[`${box}`].filter((x) => x.name === 'note')[0]}
          setter={setNote}
          value={note}
        />
        <label htmlFor="file"><b>File</b></label>
        <input type="file" name="file" onChange={(e) => handleFile(e)} />
        <button type="submit" disabled={!subject || !fromTo} onClick={(e) => handleAddRecord(e)}>
          Add</button>
      </div>
    </div>
  );
};

export default NewRecord;
