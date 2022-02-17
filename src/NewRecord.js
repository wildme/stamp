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
  const [error, setError] = useState(false);
  const [infoMsg, setInfoMsg] = useState('');

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
        if (res.status === 500) {
          setError(true);
          setInfoMsg("Failed to add record");
        }
      })
      .catch((e) => console.error(e))

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      await fetch(`/api/${box}/upload/${id}`, {
        method: 'POST',
        body: formData,
        })
        .then(res => {
          if (res.status === 500) {
            setError(true);
            setInfoMsg("Couldn't upload file");
          }
        })
        .catch((e) => console.error(e))
    }

    if (!error) {
      setSubject('');
      setFromTo('');
      setNote('');
      setReplyTo('');
      setFile('');
      history.replace(`/${box}`);
    }
  };
  

  return (
    <div className="add-record-grid-container">
      <div className="add-container">
        <div className="add-input-container">
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
        </div>
        <div className="add-file-container">
          <div>
            <label htmlFor="file"><b>File</b></label>
          </div>
          <input type="file" name="file" id="upload"
          onChange={(e) => handleFile(e)} />
        </div>
        <div className="add-btn-container">
          <button type="submit" disabled={!subject || !fromTo}
            onClick={(e) => handleAddRecord(e)}>Add</button>
        </div>
      </div>
    </div>
  );
};

export default NewRecord;
