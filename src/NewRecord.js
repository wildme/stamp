import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputAttrs as attrs } from './InputAttrs.js';
import InputField from './InputField.js';
import InputFile from './InputFile.js';
import SubmitButton from './SubmitButton.js';
import DropZoneFileUpload from './DropZoneFileUpload.js';
import FlashMessage from './FlashMessage.js'
import InfoBanner from './InfoBanner.js'

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
  const [nextId, setNextId] = useState(undefined);
  const { t } = useTranslation();
  const MAX_FILE_SIZE = 5000000;

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
    const fileData = fileProps.hasOwnProperty("filename") ? fileProps : null;
    const url = `/api/${box}/new`;
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({subject, fromTo, user, replyTo, note, fileData})
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


  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const url = `/api/${box}/nextid`;
    const ws = new WebSocket(`ws://${window.location.hostname}:8080/${box}`);
    ws.addEventListener('message', (e) => { setNextId(e.data); });

    fetch(url, { headers: { 'Authorization': `Bearer ${token}` }, signal })
      .then(res =>  {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          dispatch({type: 'LOGIN', payload: { user: { loggedIn: false } }});
          return 1;
        }
      })
      .then(data => {
        if (data.token) {
          dispatch({ type: 'TOKEN', payload: { token: { string: data.token } }});
        }
        if (data !== 1) {
          setNextId(data.nextid)
        }
      })
      .catch((e) => console.error(e))

    return () => {abortController.abort();};
  }, [box, dispatch, token]);

  return (
    <div className="add-record-grid">
      {infoMsg.str &&
          <FlashMessage msg={infoMsg.str} id={infoMsg.id} type={infoMsg.type} />}
      <InfoBanner
        className="banner-nextid add-record-grid_banner_nextid"
        titleClassName="banner-nextid__title"
        valueClassName="banner-nextid__value"
        title={t('newRecord.infoMsg4')}
        value={nextId}
      />
      <div className="add-record add-record-grid__add-record">
        <InputField
          id="new"
          attrs={attrs[`${box}`].filter((x) => x.name === `${box}-subj`)[0]}
          setter={setSubject}
          value={subject}
          inputClassName="add-record__input"
          labelClassName="add-record__label"
        />
        <InputField
          id="new"
          attrs={attrs[`${box}`].filter((x) => x.name === `${box}-addr`)[0]}
          setter={setFromTo}
          value={fromTo}
          inputClassName="add-record__input"
          labelClassName="add-record__label"
        />
        <InputField
          id="new"
          attrs={attrs[`${box}`].filter((x) => x.name === `${box}-replyTo`)[0]}
          setter={setReplyTo}
          value={replyTo}
          inputClassName="add-record__input"
          labelClassName="add-record__label"
        />
        <InputField
          id="new"
          attrs={attrs[`${box}`].filter((x) => x.name === `${box}-note`)[0]}
          setter={setNote}
          value={note}
          inputClassName="add-record__input"
          labelClassName="add-record__label"
        />
        <InputFile
          label={t('newRecord.label6')}
          name={"file"}
          inputClassName="add-record__upload"
          labelClassName="add-record__label"
          setter={setFile}
          setInfoMsg={setInfoMsg}
          maxFileSize={MAX_FILE_SIZE}
          maxFileSizeExceededMsg={t('editRecord.infoMsg5')}
        />
        <DropZoneFileUpload
          setter={setFile}
          className="drop-zone-file"
          title={t('dropZoneFile.title1')}
          maxFileSize={MAX_FILE_SIZE}
          maxFileSizeExceededMsg={t('dropZoneFile.infoMsg1')}
        />
        <SubmitButton
          name={t('newRecord.button')}
          className={"add-record__submit"}
          disabled={!subject || !fromTo}
          setter={handleAddRecord}
        />
      </div>
    </div>
  );
};

export default NewRecord;
