import { useState, useRef } from 'react';
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
  const [file, setFile] = useState(null);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const history = useHistory();
  const { t } = useTranslation();
  const ref = useRef(null);
  let uploadedFile = null;

  function uploadFile() {
    const formData = new FormData();
    formData.append('file', file);

    return fetch(`/api/${box}/upload`, {
      method: 'POST',
      body: formData,
      })
      .then(res => {
        if (res.status === 200) {
          return res.json();
       }
        if (res.status === 413) {
          setInfoMsg({str: t('editRecord.infoMsg5'), id: Math.random()});
          setFile(null);
          ref.current.value='';
          return 'error';
       }
        if (res.status === 500) {
          setInfoMsg({str: t('newRecord.infoMsg2'), id: Math.random()});
          return 'error';
        }
      })
      .then(data => data)
      .catch((e) => console.error(e));
  }

  function saveRecord() {
    fetch(`/api/${box}/new`, {
      method: 'POST',
      body: JSON.stringify({subject, fromTo, addedBy, replyTo, note, uploadedFile}),
      headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        if (res.status === 200) {
          history.push(`/${box}`);
        }
        if (res.status === 500) {
          setInfoMsg({str: t('newRecord.infoMsg1'), id: Math.random()});
        }
      })
      .catch((e) => console.error(e))
  }

  const handleAddRecord = async () => {
    if (file) uploadedFile = await uploadFile();
    if (uploadedFile !== 'error') saveRecord();
  };

  return (
    <div className="add-record-grid">
      {infoMsg.str && <FlashMessage msg={infoMsg.str} id={infoMsg.id} />}
      <div className="add-record">
        <InputField
          attrs={attrs[`${box}`].filter((x) => x.name === 'subj')[0]}
          setter={setSubject}
          value={subject}
          className="add-record__input"
        />
        <InputField
          attrs={attrs[`${box}`].filter((x) => x.name === 'from' ||
            x.name === 'to')[0]}
          setter={setFromTo}
          value={fromTo}
          auto={true}
          field='name'
          className="add-record__input"
        />
        <InputField
          attrs={attrs[`${box}`].filter((x) => x.name === 'replyTo')[0]}
          setter={setReplyTo}
          value={replyTo}
          className="add-record__input"
        />
        <InputField
          attrs={attrs[`${box}`].filter((x) => x.name === 'note')[0]}
          setter={setNote}
          value={note}
          className="add-record__input"
        />
        <label htmlFor="file"><b>{t('newRecord.label6')}</b></label>
        <input
          className="add-record__upload"
          type="file"
          name="file"
          ref={ref}
          onChange={(e) => setFile(e.target.files[0])}
        />
        <button
          className="add-record__submit"
          type="submit"
          disabled={!subject || !fromTo}
          onClick={() => handleAddRecord()}>
          {t('newRecord.button')}
        </button>
      </div>
    </div>
  );
};

export default NewRecord;
