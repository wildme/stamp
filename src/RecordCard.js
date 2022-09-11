import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ErrorPage from './ErrorPage.js';
import FlashMessage from './FlashMessage.js'

const RecordCard = () => {
  const { id, box } = useParams();
  const user = useSelector((state) => state.user);
  const token = useSelector((state) => state.token.string);
  const dispatch = useDispatch();
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
  const [owner, setOwner] = useState(undefined);
  const { t } = useTranslation();
  const dateStr = date ? new Date(date).toLocaleString() : null;
  const updatedStr = updated ? new Date(updated).toLocaleString() : null;
  const accessToEdit = user.admin || (user.username === owner);

  const handleStatus = () => {
    let newStatus = 'canceled';
    statusOfRecord === newStatus ?
      newStatus = 'active' : newStatus = 'canceled';
    const url = `/api/${box}/status/${id}`;

    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({newStatus, owner}),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => {
        if (res.status === 200) {
          if (res.token) {
            dispatch({ type: 'TOKEN', payload: { token: { string: res.token } }});
          }
          setStatus(newStatus);
        }
        if (res.status === 401) {
          dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
        }
        if (res.status === 500) {
          setInfoMsg({str: t('recordCard.infoMsg1'), id: Math.random()});
        }
      })
      .catch((e) => console.error(e))
  };

  const handleDownload = (e, hash, name) => {
    e.preventDefault(e);
    const url = `/api/download/${hash}`;
    fetch(url, { headers: { 'Authorization': `Bearer ${token}` }})
      .then(res => {
        if (res.status === 200) {
          if (res.token) {
            dispatch({ type: 'TOKEN', payload: { token: { string: res.token } }});
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
        a.download=name;
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch((e) => console.error(e))
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const url = `/api/view/${box}/${id}`;

    fetch(url, { headers: { 'Authorization': `Bearer ${token}` }, signal })
      .then(res => { 
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          dispatch({type: 'LOGIN', payload: { user: { loggedIn: false } }});
        }
        if (res.status === 204) {
          setNoData(true);
        }
        if (!res.ok) {
          setInfoMsg({str: t('recordCard.infoMsg2'), id: Math.random()});
        }
      })
      .then(data => {
        if (data.token) {
          dispatch({type: 'TOKEN', payload: { token: { string: data.token } }});
        }
        setIdOfRec(data.record.id);
        setSubject(data.record.subj);
        setFromTo(data.record.addr);
        setReplyTo(data.record.reply);
        setUpdated(data.record.updated);
        setStatus(data.record.status);
        setDate(data.record.date);
        setAddedBy(data.record.fullname);
        setNote(data.record.note);
        setFile(data.record.file);
        setOwner(data.record.user);
        }
      )
      .catch((e) => console.error(e))

    return () => { abortController.abort(); };
  }, [box, id, t, token, dispatch])

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
              href={`/attachment/${file.fsName}`}
              onClick={(e) => handleDownload(e, file.fsName, file.name)}>
              {file.name}
            </a>
          </div>
        }
        {accessToEdit &&
          <button
            className={`record-card__button record-card__button_${statusOfRecord}`}
            type="submit"
            onClick={() => handleStatus()}>
             {statusOfRecord === 'active' ?
                 t('recordCard.button2') :
                  t('recordCard.button1')
             }
          </button>
        }
      </div>
    </div>
  );
};

export default RecordCard;
