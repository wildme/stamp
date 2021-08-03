import React, { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { InputAttrs as attrs } from './InputAttrs.js';
import { InputField } from './InputFields.js';

const EditRecord = () => {
  const { id } = useParams();
  const { pathname } = useLocation();
  const box = /(in|out)box/.exec(pathname)[0];
  const [subject, setSubject] = useState('');
  const [fromTo, setFromTo] = useState('');
  const [notes, setNotes] = useState('');

  const handleEditRecord = (e) => {
    e.preventDefault();
    if (/^\/inbox\//.test(pathname)) {
    // some code goes here  
      return;
    } else if (/^\/outbox\//.test(pathname)) {
    // some code goes here  
    }
    setSubject('');
    setFromTo('');
    setNotes('');
  };

  useEffect(() => {
    fetch(`/api/${box}/${id}`)
    .then(res => res.json())
      .then(data => data.map((item) => {
        setSubject(item.subject);
        setFromTo(item.from || item.to);
        setNotes(item.notes);
      })
      )
  }, [])

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
        />
        <InputField
          attrs={attrs[`${box}`].filter((x) => x.name === 'note')[0]}
          setter={setNotes}
          value={notes}
        />
        <button type="submit" onClick={(e) => handleEditRecord(e)}>
          Update
        </button>
      </div>
    </div>
  );
};

export default EditRecord;
