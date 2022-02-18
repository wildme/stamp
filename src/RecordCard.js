import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
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
          setInfoMsg("Couldn't update status");
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
        if (!res.ok) throw new Error('Network issue occured');
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
        if (!res.ok) throw new Error('Network issue occured');
    })
      .then(data => setFile(data))
      .catch((e) => console.error(e))

    return () => { abortController.abort(); };
  }, [box, id])

  return noData ? <PageNotFound /> : (
    <div className="record-card-grid-container">
      <div className="record-card">
        <div className="record-header">
          { <h2>{box} #{idOfRec}</h2> }
          <hr/>
        </div>
        <div className="record-fields">
          <div className="record-attr"><b>Subject</b>:
            <div className="long-field-card">{subject}</div>
          </div>
        { box === 'inbox' ?
          <div className="record-attr"><b>From</b>: {fromTo}</div> :
          <div className="record-attr"><b>To</b>: {fromTo}</div> }
        { <div className="record-attr"><b>Date</b>: {dateStr}</div> }
        { updated &&
            <div className="record-attr"><b>Updated</b>: {updatedStr || '-'}
        </div> }
        { <div className="record-attr"><b>Reply to</b>: {replyTo || '-'}
        </div> }
        { <div className="record-attr"><b>User</b>: {addedBy}
        </div> }
        { <div className="record-attr"><b>Status</b>: {statusOfRecord}
        </div> }
        { <div className="record-attr"><b>Note</b>:
            <div className="long-field-card">{note || '-'}</div>
        </div> }
        </div>
        { file && <div className="record-attr">
          <div className="record-attachment">
            <a href={`/attachment/${file._id}`}
              onClick={(e) => handleDownload(e)}>{file.filename}
            </a>
          </div>
        </div> }
        <div className="record-status-button">
          <button type="submit" id={statusOfRecord}
             onClick={() => handleStatus()} hidden={!accessToEdit}>
             { statusOfRecord === 'active' ? 'Cancel' : 'Activate' }
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordCard;
