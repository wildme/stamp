import { Link } from 'react-router-dom';
import { Fragment, useContext } from 'react';
import RowActions from './RowActions.js';
import { BoxContext } from './Main.js';
import { ContactsContext } from './Contacts.js';

const Row = ({ entry }) => {
  const box = useContext(BoxContext);
  const contacts = useContext(ContactsContext);

  return (
  <Fragment>
  { box &&
    <tr className="inbox-item">
      <td><Link to={`/${box}/${entry.id}`}>{entry.id}</Link></td>
      <td>{entry.subject}</td>
      <td>{entry.from || entry.to}</td>
      <td>{new Date(entry.date).toLocaleString('ru-Ru')}</td>
      <td>{entry.addedBy}</td>
      <td>{entry.replyTo || '-'}</td>
      <td><RowActions id={entry.id} /></td>
    </tr>
  }
  { contacts &&
    <tr className="inbox-item">
      <td>{entry.location}</td>
      <td>{entry.region}</td>
      <td>{entry.name}</td>
    </tr>
  }
  </Fragment>
  )
};

export default Row;
