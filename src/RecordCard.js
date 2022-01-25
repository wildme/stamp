import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const RecordCard = () => {
  const { id, box } = useParams();
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
      .catch(err => console.error(err))
  };

  const handleDownload = (e) => {
    e.preventDefault(e);
    fetch(`/api/download/${file.fsFilename}`)
      .then(res => res.blob())
      .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectURL;
        a.download=file.filename;
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch(err => console.error(err))
  };

  useEffect(() => {
    fetch(`/api/${box}/${id}`)
      .then(res => res.json())
      .then(data => data.map((item) => {
        setIdOfRec(item.id);
        setSubject(item.subject);
        setFromTo(item.from || item.to);
        setReplyTo(item.replyTo);
        setUpdated(item.updated);
        setStatus(item.status);
        setDate(item.date);
        setAddedBy(item.addedBy);
        setNote(item.notes);
      })
      )

  fetch(`/api/attachment/${box}/${id}`)
      .then(res => {
        if (res.status === 200) return res.json();
        if (!res.ok) throw new Error('Network issue occured');
    })
      .then(data => setFile(data))
      .catch(err => console.error(err))

  }, [])

  return (
    <div className="record-card-grid-container">
      <div className="record-card">
        <div className="record-header">
          {<h2>{box} #{idOfRec}</h2>}
          <hr/>
        </div>
        <div className="record-fields">
          {<p><b>Subject</b>:<div className="long-field-card">{subject}</div></p>}
        {box === 'inbox' ? 
            <p><b>From</b>: {fromTo}</p> :
            <p><b>To</b>:{fromTo}</p>}
          {<p><b>Date</b>: {dateStr}</p>}
          {updated && <p><b>Updated</b>: {updatedStr || '-'}</p>}
          {<p><b>Reply to</b>: {replyTo || '-'}</p>}
          {<p><b>User</b>: {addedBy}</p>}
          {<p><b>Status</b>: {statusOfRecord}</p>}
          {<p><b>Note</b>:<div className="long-field-card">{note || '-'}</div></p>}
        </div>
        {file && 
          <div className="record-attachment">
            <a href="#" onClick={(e) => handleDownload(e)}>{file.filename}</a>
          </div>}
    <div className="record-status-button">
        <button type="submit" id={statusOfRecord} onClick={(e) => handleStatus(e)}>
    {statusOfRecord === 'active' ? 'Cancel' : 'Activate'}</button>
    </div>
      </div>
    </div>
  );
};

export default RecordCard;
