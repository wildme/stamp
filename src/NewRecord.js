import { useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputAttrs as attrs } from './InputAttrs.js';
import InputField from './InputFields.js';
import DropZoneFileUpload from './DropZoneFileUpload.js';
import FlashMessage from './FlashMessage.js'

function logout(dispatch) {
  dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
}

function updateToken(newToken, dispatch) {
  dispatch({ type: 'TOKEN', payload: { token: { string: newToken } }});
}

const NewRecord = () => {
  const { box } = useParams();
  const user = useSelector((state) => state.user.username);
  const token = useSelector((state) => state.token.string);
  const dispatch = useDispatch();
  const history = useHistory();
  const storeSubj = localStorage.getItem(`${box}-subj-new`);
  const storeFromTo = localStorage.getItem(`${box}-addr-new`);
  const storeNote = localStorage.getItem(`${box}-note-new`);
  const storeReplyTo = localStorage.getItem(`${box}-replyTo-new`);
  const [subject, setSubject] = useState(storeSubj || '');
  const [fromTo, setFromTo] = useState(storeFromTo || '');
  const [note, setNote] = useState(storeNote || '');
  const [replyTo, setReplyTo] = useState(storeReplyTo || '');
  const [file, setFile] = useState(null);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const { t } = useTranslation();
  const ref = useRef(null);

  function uploadFile() {
    const url = `/api/${box}/upload`;
    const formData = new FormData();
    formData.append('file', file);

    return fetch(url, {
      method: 'POST',
      headers: {'Authorization': `Bearer ${token}`},
      body: formData
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          logout(dispatch);
          return 1;
        }
        if (res.status === 413) {
          setInfoMsg({str: t('editRecord.infoMsg5'), id: Math.random()});
          setFile(null);
          ref.current.value='';
          return 1;
        }
        if (res.status === 500) {
          setInfoMsg({str: t('newRecord.infoMsg2'), id: Math.random()});
          return 1;
        }
      })
      .then(data => {
        if (data.token) {
          updateToken(data.token, dispatch);
        }
        if (data === 1) {
          return 'error';
        }
        return data.file;
      })
      .catch((e) => console.error(e));
  }

  function saveRecord(fileProps) {
    const url = `/api/${box}/new`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({subject, fromTo, user, replyTo, note, fileProps})
    })
      .then(res => {
        if (res.status === 200) {
          localStorage.removeItem(`${box}-subj-new`);
          localStorage.removeItem(`${box}-addr-new`);
          localStorage.removeItem(`${box}-note-new`);
          localStorage.removeItem(`${box}-replyTo-new`);
          return res.json();
        }
        if (res.status === 401) {
          logout(dispatch);
          return 1;
        }
        if (res.status === 500) {
          setInfoMsg({str: t('newRecord.infoMsg1'), id: Math.random()});
          return 1;
        }
      })
      .then(data => {
        if (data.token) {
          updateToken(data.token, dispatch);
        }
        history.replace(`/${box}/view/${data.id}`);
      })
      .catch((e) => console.error(e))
  }

  const handleAddRecord = async () => {
    let fileProps = {};
    if (file) {
      fileProps = await uploadFile();
    }
    if (fileProps !== 'error') {
      saveRecord(fileProps);
    }
  };


  return (
    <div className="add-record-grid">
      {infoMsg.str &&
          <FlashMessage msg={infoMsg.str} id={infoMsg.id} type={infoMsg.type} />}
      <div className="add-record">
        <InputField
          id="new"
          attrs={attrs[`${box}`].filter((x) => x.name === `${box}-subj`)[0]}
          setter={setSubject}
          value={subject}
          className="add-record__input"
        />
        <InputField
          id="new"
          attrs={attrs[`${box}`].filter((x) => x.name === `${box}-addr`)[0]}
          setter={setFromTo}
          value={fromTo}
          field='name'
          className="add-record__input"
        />
        <InputField
          id="new"
          attrs={attrs[`${box}`].filter((x) => x.name === `${box}-replyTo`)[0]}
          setter={setReplyTo}
          value={replyTo}
          className="add-record__input"
        />
        <InputField
          id="new"
          attrs={attrs[`${box}`].filter((x) => x.name === `${box}-note`)[0]}
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
        <DropZoneFileUpload
          t={t}
          setter={setFile}
          className="drop-zone-file"
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
