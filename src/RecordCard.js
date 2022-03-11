import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PageNotFound from './404.js';

const RecordCard = () => {
  const { id, box } = useParams();
  const [idOfRec, setIdOfRec] = useState(id);
  const [subject, setSubject] = useState('Loading...');
  const [fromTo, setFromTo] = useState('Loading...');
  const [note, setNote] = useState('-');
  const [replyTo, setReplyTo] = useState('-');
  const [updated, setUpdated] = useState(null);
  const [statusOfRecord, setStatus] = useState('Loading...');
  const [date, setDate] = useState(null);
  const [addedBy, setAddedBy] = useState('Loading...');
  const [file, setFile] = useState(null);
  const [noData, setNoData] = useState(false);
  const [error, setError] = useState(false);
  const [infoMsg, setInfoMsg] = useState('');
  const { t } = useTranslation();
  const dateStr = date ?
    new Date(date).toLocaleString('ru-Ru') : 'None';
  const updatedStr = updated ?
    new Date(updated).toLocaleString('ru-Ru') : 'None';
  const user = useSelector((state) => state.user);
  const accessToEdit = user.admin || (user.username === addedBy);

  const handleStatus = () => {
    let newStatus = 'canceled';
    statusOfRecord === newStatus ?
      newStatus = 'active' :
      newStatus = 'canceled'; 

    fetch(`/api/${box}/status/${id}`, {
      method: 'POST',
      body: JSON.stringify({ newStatus }),
      headers: {'Content-Type': 'application/json'}
    })
      .then(res => {
        if (res.ok) setStatus(newStatus);
        if (res.status === 500) {
          setError(true);
          setInfoMsg(t('recordCard.infoMsg1'));
        }
      })
      .catch((e) => console.error(e))
  };

  const handleDownload = (e) => {
    e.preventDefault(e);
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

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    fetch(`/api/${box}/${id}`, { signal })
      .then(res => { 
        if (res.status === 200) return res.json();
        if (res.status === 204) setNoData(true);
        if (!res.ok) setInfoMsg(t('recordCard.infoMsg2'));
      })
      .then(data => data.map((item) => {
        return (
          setIdOfRec(item.id),
          setSubject(item.subject),
          setFromTo(item.from || item.to),
          setReplyTo(item.replyTo),
          setUpdated(item.updated),
          setStatus(item.status),
          setDate(item.date),
          setAddedBy(item.addedBy),
          setNote(item.note)
        )}
      ))
      .catch((e) => console.error(e))

    fetch(`/api/attachment/${box}/${id}`, { signal })
      .then(res => {
        if (res.status === 200) return res.json();
        if (!res.ok) setInfoMsg(t('recordCard.infoMsg3'));
    })
      .then(data => setFile(data))
      .catch((e) => console.error(e))

    return () => { abortController.abort(); };
  }, [box, id])

  return noData ? <PageNotFound /> : (
    <div className="record-card-grid-container">
      <div className="record-card">
        <div className="record-header">
          { <h2>{ t(`recordCard.title${box}`) } #{idOfRec}</h2> }
          <hr/>
        </div>
        <div className="record-fields">
          <div className="record-attr"><b>{ t('recordCard.subject') }</b>:
            <div className="long-field-card">{subject}</div>
          </div>
        { box === 'inbox' ?
          <div className="record-attr">
            <b>{ t('recordCard.from') }</b>: {fromTo}
          </div> :
          <div className="record-attr">
            <b>{ t('recordCard.to') }</b>: {fromTo}
          </div>
        }
        <div className="record-attr">
          <b>{ t('recordCard.date') }</b>: {dateStr}
        </div>
        { updated &&
        <div className="record-attr">
          <b>{ t('recordCard.updated') }</b>: {updatedStr || '-'}
        </div>
        }
        <div className="record-attr">
          <b>{ t('recordCard.replyTo') }</b>: {replyTo || '-'}
        </div>
        <div className="record-attr">
          <b>{ t('recordCard.user') }</b>: {addedBy}
        </div>
        <div className="record-attr">
          <b>{ t('recordCard.status') }</b>: {statusOfRecord}
        </div>
        <div className="record-attr">
          <b>{ t('recordCard.note') }</b>:
          <div className="record-break-line">{note || '-'}</div>
        </div> 
        </div>
        { file && <div className="record-attr">
          <div className="record-attachment">
            <a href={`/attachment/${file._id}`}
              onClick={(e) => handleDownload(e)}>
              <div className="record-hidden-line">{file.filename}</div>
            </a>
          </div>
        </div>
        }
        <div className="record-status-button">
          <button type="submit" id={statusOfRecord}
             onClick={() => handleStatus()} hidden={!accessToEdit}>
             { statusOfRecord === 'active' ? t('recordCard.button2') :
                  t('recordCard.button1')
             }
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordCard;
