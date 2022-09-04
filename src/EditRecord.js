import { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputAttrs as attrs } from './InputAttrs.js';
import InputField from './InputFields.js';
import ErrorPage from './ErrorPage.js';
import FlashMessage from './FlashMessage.js'

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
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.username);
  const ref = useRef(null);
  let uploadedFile = null;

  function uploadFile(file) {
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
          setNewFile(null);
          ref.current.value = '';
          return 'error';
        }
        if (res.status === 500) {
          setInfoMsg({str: t('editRecord.infoMsg3'), id: Math.random()});
          return 'error';
        }
       })
      .then(data => data)
      .catch((e) => console.error(e));
  }

  function deleteFile(file) {
    return fetch(`/api/attachment/delete/${file}`, {method: 'DELETE'})
      .then(res => {
        if (res.status === 200) {
          setDelFile(false);
          if (!newFile) setFile(false);
        }
        if (res.status === 500) {
          setInfoMsg({str: t('editRecord.infoMsg2'), id: Math.random()});
        }
      })
      .catch((e) => console.error(e))
  }

  function saveRecord() {
    setDisableBtn(true);
    fetch(`/api/${box}/update/${id}`, {
      method: 'PUT',
      body: JSON.stringify({subject, fromTo, replyTo, note, uploadedFile, owner}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          if (res.headers.get('Token')) {
            const newToken = res.headers.get('Token');
            dispatch({ type: 'TOKEN', payload: { token: { string: newToken } }});
          }
          const contentType = res.headers.get('content-type');
          ref.current.value = '';
          setNewFile(null);
          setInfoMsg(
            {str: t('editRecord.infoMsg6'), id: Math.random(), type: 'success'}
          );
          if (contentType.includes('application/json')) {
            res.json().then(data => {
              setFile(data.Newfile);
              if (data.token) {
                dispatch({ type: 'TOKEN', payload: { token: { string: data.token } }});
              }
            });
          }
          setDisableBtn(false);
        }
        if (res.status === 401) {
          dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
        }

        if (res.status === 500) {
          setInfoMsg({str: t('editRecord.infoMsg1'), id: Math.random()});
        }
      })
      .catch((e) => console.error(e))
  }

  const handleDownload = (e, hash, name) => {
    e.preventDefault();
    fetch(`/api/download/${hash}`, { headers: { 'Authorization': `Bearer ${token}` }})
      .then(res => {
        if (res.status === 200) {
          //check this code
          if (res.headers.get('Token')) {
            const newToken = res.headers.get('Token');
            dispatch({ type: 'TOKEN', payload: { token: { string: newToken } }});
          }
          return res.blob();
        }
        if (res.status === 401) {
          dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
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
    if (newFile) uploadedFile = await uploadFile(newFile);
    if (delFile || (newFile && file)) await deleteFile(file.fsName);
    if (uploadedFile !== 'error') saveRecord();
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
        if (res.status === 403) {
          setPermitted(false);
        }
        if (res.status === 401) {
          dispatch({type: 'LOGIN', payload: { user: { loggedIn: false } }});
        }
        if (res.status === 204) setNoData(true);
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
  }, [box, id, t, user, token, dispatch]);

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
