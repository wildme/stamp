import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputAttrs as attrs } from './InputAttrs.js';
import InputField from './InputField.js';
import InputFile from './InputFile.js';
import SubmitButton from './SubmitButton.js';
import ErrorPage from './ErrorPage.js';
import DropZoneFileUpload from './DropZoneFileUpload.js';
import FlashMessage from './FlashMessage.js'
import DownloadLink from './DownloadLink.js'
import CheckBox from './CheckBox.js'

function logout(dispatch) {
  dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
}

function updateToken(newToken, dispatch) {
  dispatch({ type: 'TOKEN', payload: { token: { string: newToken } }});
}

const EditRecord = () => {
  const { id, box } = useParams();
  const token = useSelector((state) => state.token.string);
  const dispatch = useDispatch();
  const [subject, setSubject] = useState('');
  const [fromTo, setFromTo] = useState('');
  const [note, setNote] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [owner, setOwner] = useState(undefined);
  const [permitted, setPermitted] = useState(true);
  const [delFile, setDelFile] = useState(false);
  const [file, setFile] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [noData, setNoData] = useState(false);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const [disableBtn, setDisableBtn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [clearDropZone, setClearDropZone] = useState(false);
  const [clearInputFile, setClearInputFile] = useState(false);
  const { t } = useTranslation();
  const MAX_FILE_SIZE = 5000000;

  function uploadFile(file) {
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
          setInfoMsg({str: t('editRecord.infoMsg3'), id: Math.random()});
          return 1;
        }
      })
      .then(data => {
        if (data.token) {
          updateToken(data.token, dispatch);
        }
        if (data === 1 ) {
          return 'error';
        }
        return data.file;
      })
      .catch((e) => console.error(e));
  }

  function deleteFile(file) {
    const url = `/api/attachment/delete/${file}`;
    return fetch(url, {
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${token}`}
    })
      .then(res => {
        if (res.status === 200) {
          setDelFile(false);
          setFile(null);
          if (res.token) {
            updateToken(res.token, dispatch);
          }
        }
        if (res.status === 401) {
          logout(dispatch);
        }
        if (res.status === 500) {
          setInfoMsg({str: t('editRecord.infoMsg2'), id: Math.random()});
        }
      })
      .catch((e) => console.error(e))
  }

  function saveRecord(fileProps) {
    const fileData = fileProps.hasOwnProperty("filename") ? fileProps : null;
    const url = `/api/${box}/update/${id}`;
    setDisableBtn(true);
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({subject, fromTo, replyTo, note, fileData, owner})
    })
      .then(res => {
        if (res.status === 200) {
          setClearDropZone(!clearDropZone);
          setClearInputFile(!clearInputFile);
          setNewFile(null);
          localStorage.removeItem(`${box}-subj-${id}`);
          localStorage.removeItem(`${box}-addr-${id}`);
          localStorage.removeItem(`${box}-note-${id}`);
          localStorage.removeItem(`${box}-replyTo-${id}`);
          setInfoMsg({str: t('editRecord.infoMsg6'), id: Math.random(), type: 'success'});
          setDisableBtn(false);
          const contentType = res.headers.get('Content-Type');
          if (contentType.includes('application/json')) {
            return res.json();
          }
          return 0;
        }
        if (res.status === 401) {
          logout(dispatch);
          return 1;
        }
        if (res.status === 500) {
          setInfoMsg({str: t('editRecord.infoMsg1'), id: Math.random()});
          return 1;
        }
      })
      .then(data => {
        if (data.token) {
            updateToken(data.token, dispatch);
        }
        if (data.newFile) {
          setFile(data.newFile);
        }
      })
      .catch((e) => console.error(e))
  }

  const handleEditRecord = async () => {
    let fileProps = {};
    if (newFile) {
      fileProps = await uploadFile(newFile);
    }
    if (delFile || (file?.fsName && fileProps.filename)) {
      deleteFile(file.fsName);
    }
    if (fileProps !== 'error') {
      saveRecord(fileProps);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const url = `/api/edit/${box}/${id}`;

    const storeSubj = localStorage.getItem(`${box}-subj-${id}`);
    const storeFromTo = localStorage.getItem(`${box}-addr-${id}`);
    const storeNote = localStorage.getItem(`${box}-note-${id}`);
    const storeReplyTo = localStorage.getItem(`${box}-replyTo-${id}`);

    fetch(url, { headers: { 'Authorization': `Bearer ${token}` }, signal })
      .then(res =>  {
        if (res.status === 200) {
          setLoading(true);
          return res.json();
        }
        if (res.status === 401) {
          dispatch({type: 'LOGIN', payload: { user: { loggedIn: false } }});
          return 1;
        }
        if (res.status === 403) {
          setPermitted(false);
          return 1;
        }
        if (res.status === 204) {
          setNoData(true);
          return 1;
        }
      })
      .then(data => {
        if (data.token) {
          dispatch({ type: 'TOKEN', payload: { token: { string: data.token } }});
        }
        if (data !== 1) {
          setSubject(storeSubj || data.record.subj);
          setFromTo(storeFromTo || data.record.addr);
          setNote(storeNote || data.record?.note);
          setReplyTo(storeReplyTo || data.record?.reply);
          setFile(data.record?.file);
          setOwner(data.record.user);
        }
      })
      .catch((e) => console.error(e))

    return () => {abortController.abort();};
  }, [box, id, t, token, dispatch]);

  if (noData) return <ErrorPage code={404} />;
  if (!permitted) return <ErrorPage code={403} />;
  return !loading ? (<p></p>) : (
      <div className="edit-record-grid">
        {infoMsg.str &&
          <FlashMessage msg={infoMsg.str} id={infoMsg.id} type={infoMsg.type} />}
        <div className="edit-record edit-record-grid__edit-record">
          <InputField
            id={id}
            attrs={attrs[`${box}`].filter((x) => x.name ===`${box}-subj`)[0]}
            setter={setSubject}
            value={subject}
            inputClassName="edit-record__input"
            labelClassName="edit-record__label"
          />
          <InputField
            id={id}
            attrs={attrs[`${box}`].filter((x) => x.name === `${box}-addr`)[0]}
            setter={setFromTo}
            value={fromTo}
            field='name'
            inputClassName="edit-record__input"
            labelClassName="edit-record__label"
          />
          <InputField
            id={id}
            attrs={attrs[`${box}`].filter((x) => x.name === `${box}-replyTo`)[0]}
            setter={setReplyTo}
            value={replyTo}
            inputClassName="edit-record__input"
            labelClassName="edit-record__label"
          />
          <InputField
            id={id}
            attrs={attrs[`${box}`].filter((x) => x.name === `${box}-note`)[0]}
            setter={setNote}
            value={note}
            inputClassName="edit-record__input"
            labelClassName="edit-record__label"
          />
          <InputFile
            label={t('editRecord.label2')}
            name={"file"}
            inputClassName="edit-record__upload"
            labelClassName="edit-record__label"
            clearOnSuccess={clearInputFile}
            setter={setNewFile}
            setInfoMsg={setInfoMsg}
            maxFileSize={MAX_FILE_SIZE}
            maxFileSizeExceededMsg={t('editRecord.infoMsg5')}
          />
          {file?.fsName &&
          <div>
            <DownloadLink
              linkname={t('editRecord.link')}
              hash={file.fsName}
              filename={file.name}
            />
            <CheckBox
              setter={setDelFile}
              value={delFile}
              className={"edit-record__checkbox"}
              label={t('editRecord.label1')}
              name={"del-file"}
              id={"del"}
            />
          </div>}
          <DropZoneFileUpload
            setter={setNewFile}
            className="drop-zone-file"
            clearOnSuccess={clearDropZone}
            title={t('dropZoneFile.title1')}
            maxFileSize={MAX_FILE_SIZE}
            maxFileSizeExceededMsg={t('dropZoneFile.infoMsg1')}
          />
          <SubmitButton
            name={t('editRecord.button')}
            className={"edit-record__submit"}
            disabled={!subject || !fromTo || disableBtn}
            setter={handleEditRecord}
          />
        </div>
      </div>
  );
};

export default EditRecord;
