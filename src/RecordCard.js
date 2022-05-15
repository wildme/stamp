import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import ErrorPage from './ErrorPage.js';
import FlashMessage from './FlashMessage.js'

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
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const { t } = useTranslation();
  const dateStr = date ?
    new Date(date).toLocaleString(i18n.language) : 'None';
  const updatedStr = updated ?
    new Date(updated).toLocaleString(i18n.language) : 'None';
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
          setInfoMsg({str: t('recordCard.infoMsg1'), id: Math.random()});
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
    const signal = abortController.signal;

    fetch(`/api/${box}/${id}`, { signal })
      .then(res => { 
        if (res.status === 200) return res.json();
        if (res.status === 204) setNoData(true);
        if (!res.ok) {
          setInfoMsg({str: t('recordCard.infoMsg2'), id: Math.random()});
        }
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
        if (!res.ok) {
          setInfoMsg({str: t('recordCard.infoMsg3'), id: Math.random()});
        }
    })
      .then(data => setFile(data))
      .catch((e) => console.error(e))

    return () => { abortController.abort(); };
  }, [box, id, t])

  if (noData) return <ErrorPage code={404} />

  return (
    <div className="record-card-grid">
      {infoMsg.str && <FlashMessage msg={infoMsg} id={infoMsg.id} />}
      <div className="record-card">
        <div className="record-card__title">
          {<h2>{t(`recordCard.title${box}`)} #{idOfRec}</h2>}
          <hr/>
        </div>
          <div className="record-card__field record-card__field_long">
            <b>{t('recordCard.subject')}</b>: {subject}
          </div>
        {box === 'inbox' ?
          <div className="record-card__field record-card__field_long">
            <b>{t('recordCard.from')}</b>: {fromTo}
          </div> :
          <div className="record-card__field record-card__field_long">
            <b>{t('recordCard.to')}</b>: {fromTo}
          </div>
        }
          <div className="record-card__field">
            <b>{t('recordCard.date')}</b>: {dateStr}
          </div>
        {updated &&
          <div className="record-card__field">
            <b>{t('recordCard.updated')}</b>: {updatedStr || '-'}
          </div>
        }
          <div className="record-card__field">
            <b>{t('recordCard.replyTo')}</b>: {replyTo || '-'}
          </div>
          <div className="record-card__field">
            <b>{t('recordCard.user')}</b>: {addedBy}
          </div>
          <div className="record-card__field">
            <b>{t('recordCard.status')}</b>: {statusOfRecord}
          </div>
          <div className="record-card__field record-card__field_long">
            <b>{t('recordCard.note')}</b>: {note || '-'}
          </div>
        {file &&
          <div className="record-card__file record-card__file_long">
            <a
              href={`/attachment/${file._id}`}
              onClick={(e) => handleDownload(e)}>{file.filename}
            </a>
          </div>
        }
          <button
            className={`record-card__button record-card__button_${statusOfRecord}`}
            type="submit"
            onClick={() => handleStatus()}
            hidden={!accessToEdit}>
             {statusOfRecord === 'active' ?
                 t('recordCard.button2') :
                  t('recordCard.button1')
             }
          </button>
      </div>
    </div>
  );
};

export default RecordCard;
