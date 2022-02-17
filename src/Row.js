import { Link } from 'react-router-dom';
import { useState, Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { HiPencil, HiCheckCircle, HiXCircle, HiTrash } from 'react-icons/hi';
import { BoxContext } from './Main.js';
import { ContactsContext } from './Contacts.js';

const Row = ({ entry }) => {
  const [editOn, setEditOn] = useState(false);
  const [name, setName] = useState(entry.name);
  const [location, setLocation] = useState(entry.location);
  const [region, setRegion] = useState(entry.region);
  const [hidden, setHidden] = useState(false);
  const [error, setError] = useState(false);
  const [infoMsg, setInfoMsg] = useState('');

  const box = useContext(BoxContext);
  const contacts = useContext(ContactsContext);
  const dateStr = new Date(entry.date).toLocaleString('ru-Ru');
  const user = useSelector((state) => state.user);
  const accessToEdit = user.admin || (user.username === entry.addedBy);

  const handleEdit = () => {
    setEditOn(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure?")) {
      fetch(`/api/contact/delete/${id}`)
        .then(res => {
          if (res.ok) setHidden(true);
          if (res.status === 500) {
            setError(true);
            setInfoMsg("Couldn't delete contact");
          }
        })
        .catch((e) => console.error(e))
    }
  }

  const handleSubmit = (id) => {
    fetch("/api/contact/update", {
      method: 'POST',
      body: JSON.stringify({ id, name, location, region }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.ok) setEditOn(false);
        if (res.status === 500) {
          setError(true);
          setInfoMsg("Couldn't update contact");
        }
      })
      .catch((e) => console.error(e))
  };

  const handleCancel = () => {
    setEditOn(false);
    setName(entry.name);
    setLocation(entry.location);
    setRegion(entry.region);
  };

  return (
  <Fragment>
  { box &&
    <tr className="box-item" id={entry.status}>
      <td><Link to={`/${box}/view/${entry.id}`}>{entry.id}</Link></td>
      <td><div className="long-col-tbl">{entry.subject}</div></td>
      <td><div className="long-col-tbl">{entry.from || entry.to}</div></td>
      <td>{dateStr}</td>
      <td>{entry.addedBy}</td>
      <td>{entry.replyTo || '-'}</td>
      <td>{ accessToEdit &&
          <Link to={`/${box}/edit/${entry.id}`}><HiPencil /></Link> }
      </td>
    </tr>
  }
  { contacts &&
    <tr className="contact-item" hidden={hidden}>
      <td>{ editOn ? <input type="text" value={name}
        onChange={(e) => setName(e.target.value)} /> : name }
      </td>
      <td>{ editOn ? <input type="text" value={location}
        onChange={(e) => setLocation(e.target.value)}/> : location }
      </td>
      <td>{ editOn ? <input type="text" value={region}
        onChange={(e) => setRegion(e.target.value)}/> : region}
      </td>
      <td>{ !editOn ?
          <>
            <button onClick={() => handleEdit()}><HiPencil /></button>
            <button onClick={() => handleDelete(entry._id)}><HiTrash /></button>
          </> :
          <>
            <button
              onClick={() => handleSubmit(entry._id)}><HiCheckCircle />
            </button>
            <button onClick={() => handleCancel()}><HiXCircle /></button>
          </>
        }
      </td>
    </tr>
  }
  </Fragment>
  )
};

export default Row;
