import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputAttrs as attrs } from './InputAttrs.js';
import InputField from './InputFields.js';
import ErrorPage from './ErrorPage.js';
import FlashMessage from './FlashMessage.js'

const EditRecord = () => {
  const { id, box } = useParams();
  const [subject, setSubject] = useState('');
  const [fromTo, setFromTo] = useState('');
  const [note, setNote] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [permitted, setPermitted] = useState(true);
  const [delFile, setDelFile] = useState(false);
  const [file, setFile] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [noData, setNoData] = useState(false);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const history = useHistory();
  const { t } = useTranslation();
  const user = useSelector((state) => state.user.username);

  const handleDownload = (e) => {
    e.preventDefault();
    fetch(`/api/download/${file._id}`)
      .then(res => res.blob())
      .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectURL;
        a.download=file.filename;
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch((e) => console.error(e))
  };

  const handleEditRecord = (e) => {
    e.preventDefault();
    fetch(`/api/${box}/update/${id}`, {
      method: 'POST',
      body: JSON.stringify({ subject, fromTo, replyTo, note }),
      headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        if ((res.status === 200) && !newFile && !delFile) {
          history.push(`/${box}`);
        }
        if (res.status === 500) {
          setInfoMsg({str: t('editRecord.infoMsg1'), id: Math.random()});
        }
      })
      .catch((e) => console.error(e))

    if (delFile || (newFile && file)) {
      const fileId = file._id;
      fetch(`/api/attachment/delete/${fileId}`)
        .then(res => {
          if ((res.status === 200) && !newFile) {
            history.push(`/${box}`);
          }
          if (res.status === 500) {
            setInfoMsg({str: t('editRecord.infoMsg2'), id: Math.random()});
          }
        })
        .catch((e) => console.error(e))
    }

    if (newFile) {
      const formData = new FormData();
      formData.append('file', newFile);
      fetch(`/api/${box}/upload/${id}`, {
        method: 'POST',
        body: formData,
       })
       .then(res => {
         if (res.status === 200) {
            history.push(`/${box}`);
         }
         if (res.status === 413) {
           setInfoMsg({str: t('editRecord.infoMsg5'), id: Math.random()});
         }
         if (res.status === 500) {
           setInfoMsg({str: t('editRecord.infoMsg3'), id: Math.random()});
         }
       })
       .catch((e) => console.error(e))
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch(`/api/${box}/${id}`, { signal })
      .then(res =>  {
        if (res.status === 200) return res.json();
        if (res.status === 204) setNoData(true);
      })
      .then(data => {
        if (data[0].addedBy === user || user === 'admin') {
          setPermitted(true);
          data.map((item) => {
            return (
              setSubject(item.subject),
              setFromTo(item.from || item.to),
              setNote(item.note),
              setReplyTo(item.replyTo)
            )})
        } else {
          setPermitted(false);
        }
        })
        .catch((e) => console.error(e))

    fetch(`/api/attachment/${box}/${id}`, { signal })
      .then(res => {
        if (res.status === 200) return res.json();
        if (res.status === 204) setFile(null);
        if (!res.ok) {
          setInfoMsg({str: t('editRecord.infoMsg4'), id: Math.random()});
        }
    })
      .then(data => setFile(data))
      .catch((e) => console.error(e))

    return () => { abortController.abort(); };
  }, [box, id, t, user]);

    if (noData) return <ErrorPage code={404} />;
    if (!permitted) return <ErrorPage code={401} />;
    return (
      <div className="edit-grid-container">
        { infoMsg.str && <FlashMessage msg={infoMsg.str} id={infoMsg.id}/> }
        <div className="edit-container">
          <div className="edit-input-container">
            <InputField
              attrs={attrs[`${box}`].filter((x) => x.name === 'subj')[0]}
              setter={setSubject}
              value={subject}
            />
            <InputField
              attrs={
                attrs[`${box}`].filter((x) => x.name === 'from' ||
                  x.name === 'to')[0]
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
          <div className="edit-file-container">
            <div>  
              <input type="file" id="upload"
                onChange={(e) => setNewFile(e.target.files[0])} />
            </div>
            { file &&
            <div>
              <a href={`/attachment/${file._id}`}
                onClick={(e) => handleDownload(e)}>{t('editRecord.link')}
              </a>
              <input type="checkbox" name="del-file" id="del"
                onChange={() => setDelFile(!delFile)} />
              <label htmlFor="del-file">{t('editRecord.label1')}</label>
            </div>
            }
          </div>
          <div className="update-btn-container">
            <button type="submit" disabled={!subject || !fromTo}
              onClick={(e) => handleEditRecord(e)}>{t('editRecord.button')}
            </button>
          </div>
        </div>
      </div>
  );
};

export default EditRecord;
