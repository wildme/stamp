import { useState, useRef } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputAttrs as attrs } from './InputAttrs.js';
import InputField from './InputFields.js';
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
  const storeNote = localStorage.getItem(`${box}-note-new`);
  const storeReplyTo = localStorage.getItem(`${box}-replyTo-new`);
  const [subject, setSubject] = useState(storeSubj || '');
  const [fromTo, setFromTo] = useState('');
  const [note, setNote] = useState(storeNote || '');
  const [replyTo, setReplyTo] = useState(storeReplyTo || '');
  const [file, setFile] = useState(null);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  const ref = useRef(null);
  let fileProps = undefined;

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
        }
        if (res.status === 413) {
          setInfoMsg({str: t('editRecord.infoMsg5'), id: Math.random()});
          setFile(null);
          ref.current.value='';
          setError(true);
        }
        if (res.status === 500) {
          setInfoMsg({str: t('newRecord.infoMsg2'), id: Math.random()});
          setError(true);
        }
      })
      .then(data => {
        if (data.token) {
          updateToken(data.token, dispatch);
        }
        return data.file;
      })
      .catch((e) => console.error(e));
  }

  function saveRecord() {
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
          localStorage.clear();
          return res.json();
        }
        if (res.status === 401) {
          logout(dispatch);
        }
        if (res.status === 500) {
          setInfoMsg({str: t('newRecord.infoMsg1'), id: Math.random()});
        }
      })
      .then(data => {
        if (data.token) {
          updateToken(data.token, dispatch);
        }
        //setInfoMsg({str: t('newRecord.infoMsg3'), id: Math.random(), type: 'success'});
        history.replace(`/${box}/view/${data.id}`);
      })
      .catch((e) => console.error(e))
  }

  const handleAddRecord = async () => {
    if (file) fileProps = await uploadFile();
    if (!error) saveRecord();
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
          attrs={attrs[`${box}`].filter((x) => x.name === 'from' ||
            x.name === 'to')[0]}
          setter={setFromTo}
          value={fromTo}
          auto={true}
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
