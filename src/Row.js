import { Link } from 'react-router-dom';
import { useState, Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { HiPencil, HiCheckCircle, HiXCircle } from 'react-icons/hi';
import { BoxContext } from './Main.js';
import { ContactsContext } from './Contacts.js';

const Row = ({ entry }) => {
  const [editOn, setEditOn] = useState(false);
  const [newName, setNewName] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newRegion, setNewRegion] = useState('');

  const box = useContext(BoxContext);
  const contacts = useContext(ContactsContext);
  const dateStr = new Date(entry.date).toLocaleString('ru-Ru');
  const user = useSelector((state) => state.user);
  const accessToEdit = user.admin || (user.username === entry.addedBy);

  const handleEdit = (e) => {
    e.preventDefault();
    setEditOn(true);
  };
  const handleSubmit = (e, id) => {
    // Add fetch() call here
    e.preventDefault();
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditOn(false);
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
    <tr className="contact-item">
      <td>{ editOn ? <input type="text" value={entry.name}
        onChange={(e) => setNewName(e.target.value)} />  : entry.name }
      </td>
      <td>{ editOn ? <input type="text" value={entry.location}
        onChange={(e) => setNewLocation(e.target.value)}/> : entry.location }
      </td>
      <td>{ editOn ? <input type="text" value={entry.region}
        onChange={(e) => setNewRegion(e.target.value)}/> : entry.region}
      </td>
      <td>{ !editOn ?
        <a href="#" onClick={(e) => handleEdit(e)}><HiPencil /></a> :
        <>
          <a href="#" onClick={(e) => handleSubmit(e, entry._id)}><HiCheckCircle /></a>
          <a href="#" onClick={(e) => handleCancel(e)}><HiXCircle /></a>
        </>
        }
      </td>
    </tr>
  }
  </Fragment>
  )
};

export default Row;
