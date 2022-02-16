import { Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import { useSelector } from 'react-redux';
import { HiPencil } from 'react-icons/hi';
import { BoxContext } from './Main.js';
import { ContactsContext } from './Contacts.js';

const Row = ({ entry }) => {
  const box = useContext(BoxContext);
  const contacts = useContext(ContactsContext);
  const dateStr = new Date(entry.date).toLocaleString('ru-Ru');
  const user = useSelector((state) => state.user);
  const accessToEdit = user.admin || (user.username === entry.addedBy);

  return (
  <Fragment>
  { box &&
    <tr className="box-item">
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
      <td>{entry.name}</td>
      <td>{entry.location}</td>
      <td>{entry.region}</td>
    </tr>
  }
  </Fragment>
  )
};

export default Row;
