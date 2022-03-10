import { useState } from 'react';
import { useParams, useHistory  } from 'react-router-dom';
import { InputAttrs as attrs } from './InputAttrs.js';
import InputField from './InputFields.js';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import FlashMessage from './FlashMessage.js'

const NewRecord = () => {
  const { box } = useParams();
  const [subject, setSubject] = useState('');
  const [fromTo, setFromTo] = useState('');
  const addedBy = useSelector((state) => state.user.username);
  const [note, setNote] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [file, setFile] = useState();
  const [infoMsg, setInfoMsg] = useState('');
  const history = useHistory();
  const { t } = useTranslation();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
  }

  const handleAddRecord = (e) => {
    e.preventDefault();
    const id = fetch(`/api/${box}/new`, {
      method: 'POST',
      body: JSON.stringify({ subject, fromTo, addedBy, replyTo, note}),
      headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        if ((res.status === 200) && !file) {
          history.push(`/${box}`);
        }
        if (res.status === 500) {
          setInfoMsg(t('newRecord.infoMsg1'));
        }
      })
      .catch((e) => console.error(e))

    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      fetch(`/api/${box}/upload/${id}`, {
        method: 'POST',
        body: formData,
        })
        .then(res => {
          if (res.status === 200) {
            history.push(`/${box}`);
         }
          if (res.status === 413) {
           setInfoMsg(t('editRecord.infoMsg5'));
         }
          if (res.status === 500) {
            setInfoMsg(t('newRecord.infoMsg2'));
          }
        })
        .catch((e) => console.error(e))
    }
  };

  return (
    <div className="add-record-grid-container">
      { infoMsg && <FlashMessage msg={infoMsg} /> }
      <div className="add-container">
        <div className="add-input-container">
          <InputField
            attrs={attrs[`${box}`].filter((x) => x.name === 'subj')[0]}
            setter={setSubject}
            value={subject}
          />
          <InputField
            attrs={attrs[`${box}`].filter((x) => x.name === 'from' ||
              x.name === 'to')[0]}
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
            <label htmlFor="file"><b>{ t('newRecord.label6') }</b></label>
          </div>
          <input type="file" name="file" id="upload"
            onChange={(e) => handleFile(e)} />
        </div>
        <div className="add-btn-container">
          <button type="submit" disabled={!subject || !fromTo}
            onClick={(e) => handleAddRecord(e)}>{ t('newRecord.button') }
          </button>
        </div>
      </div>
    </div>
  );
};

export default NewRecord;
