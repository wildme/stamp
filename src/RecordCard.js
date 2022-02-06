import { useState, useEffect } from 'react';
import { useParams, Redirect } from 'react-router-dom';

const RecordCard = () => {
  const { id, box } = useParams();
  const [noData, setNoData] = useState(false);
  const [idOfRec, setIdOfRec] = useState('');
  const [subject, setSubject] = useState('');
  const [fromTo, setFromTo] = useState('');
  const [note, setNote] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [updated, setUpdated] = useState('');
  const [statusOfRecord, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [addedBy, setAddedBy] = useState('');
  const [file, setFile] = useState(null);
  const dateStr = new Date(date).toLocaleString('ru-Ru'); 
  const updatedStr = new Date(updated).toLocaleString('ru-Ru');

  const handleStatus = (e) => {
    e.preventDefault();
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
        else throw new Error('Network issue occured');
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

    (async () => { await fetch(`/api/${box}/${id}`, { signal })
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
    })();

    (async () => { await fetch(`/api/attachment/${box}/${id}`, { signal })
      .then(res => {
        if (res.status === 200) return res.json();
        if (res.status === 204) setFile(null);
        if (!res.ok) throw new Error('Network issue occured');
    })
      .then(data => setFile(data))
      .catch((e) => console.error(e))
    })();

    return () => { abortController.abort(); };
  }, [box, id])

  return noData ? <Redirect to="/page-not-found" /> : (
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
          onClick={(e) => handleStatus(e)}>
          { statusOfRecord === 'active' ? 'Cancel' : 'Activate' }
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecordCard;
