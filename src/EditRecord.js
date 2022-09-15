import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputAttrs as attrs } from './InputAttrs.js';
import InputField from './InputFields.js';
import ErrorPage from './ErrorPage.js';
import FlashMessage from './FlashMessage.js'

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
  const [subject, setSubject] = useState(localStorage.getItem('subj') || '');
  const [fromTo, setFromTo] = useState('');
  const [note, setNote] = useState(localStorage.getItem('note') || '');
  const [replyTo, setReplyTo] = useState(localStorage.getItem('replyTo') || '');
  const [owner, setOwner] = useState(undefined);
  const [permitted, setPermitted] = useState(true);
  const [delFile, setDelFile] = useState(false);
  const [file, setFile] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [noData, setNoData] = useState(false);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const [disableBtn, setDisableBtn] = useState(false);
  const [error, setError] = useState(false);
  const { t } = useTranslation();
  const ref = useRef(null);
  let fileProps = undefined;

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
        }
        if (res.status === 413) {
          setInfoMsg({str: t('editRecord.infoMsg5'), id: Math.random()});
          setNewFile(null);
          ref.current.value = '';
          setError(true);
        }
        if (res.status === 500) {
          setInfoMsg({str: t('editRecord.infoMsg3'), id: Math.random()});
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

  function deleteFile(file) {
    const url = `/api/attachment/delete/${file}`;
    return fetch(url, {
      method: 'DELETE',
      headers: {'Authorization': `Bearer ${token}`}
    })
      .then(res => {
        if (res.status === 200) {
          if (res.token) {
            updateToken(res.token, dispatch);
          }
          setDelFile(false);
          if (!newFile) {
            setFile(false);
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

  function saveRecord() {
    const url = `/api/${box}/update/${id}`;
    setDisableBtn(true);
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({subject, fromTo, replyTo, note, fileProps, owner})
    })
      .then(res => {
        if (res.status === 200) {
          ref.current.value = '';
          setNewFile(null);
          localStorage.clear();
          setInfoMsg({str: t('editRecord.infoMsg6'), id: Math.random(), type: 'success'});
          setDisableBtn(false);
          const contentType = res.headers.get('Content-Type');
          if (contentType.includes('application/json')) {
            return res.json();
          }
        }
        if (res.status === 401) {
          logout(dispatch);
        }
        if (res.status === 500) {
          setInfoMsg({str: t('editRecord.infoMsg1'), id: Math.random()});
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

  const handleDownload = (e, hash, name) => {
    e.preventDefault();
    const url = `/api/download/${hash}`;
    fetch(url, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => {
        if (res.status === 200) {
          if (res.token) {
            updateToken(res.token, dispatch);
          }
          return res.blob();
        }
        if (res.status === 401) {
          logout(dispatch);
        }
      })
      .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectURL;
        a.download = name;
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch((e) => console.error(e))
  };

  const handleEditRecord = async () => {
    if (newFile) fileProps = await uploadFile(newFile);
    if (delFile || (newFile && file)) await deleteFile(file.fsName);
    if (!error) saveRecord();
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const url = `/api/edit/${box}/${id}`;

    fetch(url, { headers: { 'Authorization': `Bearer ${token}` }, signal })
      .then(res =>  {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          dispatch({type: 'LOGIN', payload: { user: { loggedIn: false } }});
        }
        if (res.status === 403) {
          setPermitted(false);
        }
        if (res.status === 204) {
          setNoData(true);
        }
      })
      .then(data => {
        if (data.token) {
          dispatch({ type: 'TOKEN', payload: { token: { string: data.token } }});
        }
        setSubject(data.record.subj);
        setFromTo(data.record.addr);
        setNote(data.record.note);
        setReplyTo(data.record.reply);
        setFile(data.record.file);
        setOwner(data.record.user);
      })
      .catch((e) => console.error(e))

    return () => {abortController.abort();};
  }, [box, id, t, token, dispatch]);

    if (noData) return <ErrorPage code={404} />;
    if (!permitted) return <ErrorPage code={403} />;

    return (
      <div className="edit-record-grid">
        {infoMsg.str &&
          <FlashMessage msg={infoMsg.str} id={infoMsg.id} type={infoMsg.type} />}
        <div className="edit-record">
            <InputField
              attrs={attrs[`${box}`].filter((x) => x.name === 'subj')[0]}
              setter={setSubject}
              value={subject}
              className="edit-record__input"
            />
            <InputField
              attrs={attrs[`${box}`].filter((x) => x.name === 'from' || x.name === 'to')[0]}
              setter={setFromTo}
              value={fromTo}
              auto={true}
              field='name'
              className="edit-record__input"
            />
            <InputField
              attrs={attrs[`${box}`].filter((x) => x.name === 'replyTo')[0]}
              setter={setReplyTo}
              value={replyTo}
              className="edit-record__input"
            />
            <InputField
              attrs={attrs[`${box}`].filter((x) => x.name === 'note')[0]}
              setter={setNote}
              value={note}
              className="edit-record__input"
            />
            <input
             className="edit-record__upload"
             type="file"
             name="file"
             ref={ref}
             onChange={(e) => setNewFile(e.target.files[0])}
            />
            {file &&
              <div>
                <a
                  href={`/attachment/${file.fsName}`}
                  onClick={(e) => handleDownload(e, file.fsName, file.name)}>
                  {t('editRecord.link')}
                </a>
                <input
                  className="edit-record__checkbox"
                  type="checkbox"
                  name="del-file"
                  checked={delFile}
                  id="del"
                  onChange={() => setDelFile(!delFile)}
                />
                <label htmlFor="del-file">{t('editRecord.label1')}</label>
              </div>
           }
            <button
              className="edit-record__submit"
              type="submit"
              disabled={!subject || !fromTo || disableBtn}
              onClick={() => handleEditRecord()}>
              {t('editRecord.button')}
            </button>
        </div>
      </div>
  );
};

export default EditRecord;
