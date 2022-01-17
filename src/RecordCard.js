import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useParams, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';

const RecordCard = () => {
  const { id, box } = useParams();
  const user = useSelector((state) => state.user.username);
  const [idOfRec, setIdOfRec] = useState('');
  const [subject, setSubject] = useState('');
  const [fromTo, setFromTo] = useState('');
  const [note, setNote] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [updated, setUpdated] = useState('');
  const [statusOfRecord, setStatus] = useState('');
  const [date, setDate] = useState('');
  const [addedBy, setAddedBy] = useState('');
  const history = useHistory();

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
    //history.replace(`/${box}`);
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
        setDate(new Date(item.date).toLocaleString('ru-Ru'));
        setAddedBy(item.addedBy);
        setNote(item.notes);
      })
      )
  }, [statusOfRecord])

  return (
    <div className="page-content">
      <div className="record-card">
        {<h1>{box}: #{idOfRec}</h1>}
        {<p>Subject: {subject}</p>}
        {box === 'inbox' ? 
            <p>From: {fromTo}</p> :
            <p>To: {fromTo}</p>}
        {<p>Date: {date}</p>}
        {updated && <p>Updated: {updated || '-'}</p>}
        {<p>Reply to: {replyTo || '-'}</p>}
        {<p>User: {addedBy}</p>}
        {<p>Status: {statusOfRecord}</p>}
        {<p>Note: {note}</p>}
        <button  onClick={(e) => handleStatus(e)}>
    {statusOfRecord === 'active' ? 'Cancel' : 'Activate'}</button>
      </div>
    </div>
  );
};

export default RecordCard;
