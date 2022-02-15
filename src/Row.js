import { Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import RowActions from './RowActions.js';
import { BoxContext } from './Main.js';
import { ContactsContext } from './Contacts.js';

const Row = ({ entry }) => {
  const box = useContext(BoxContext);
  const contacts = useContext(ContactsContext);
  const dateStr = new Date(entry.date).toLocaleString('ru-Ru');

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
      <td><RowActions id={entry.id} /></td>
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
