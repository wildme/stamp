import { Fragment } from 'react';
import RowActions from './RowActions.js';

const Row = ({ entry, table }) => {
  return (
  <Fragment>
  { table === 'box' &&
    <tr className="inbox-item">
      <td>{entry.id}</td>
      <td>{entry.subject}</td>
      <td>{entry.from || entry.to}</td>
      <td>{new Date(entry.date).toLocaleString('ru-Ru')}</td>
      <td>{entry.addedBy}</td>
      <td>{entry.notes}</td>
      <td><RowActions id={entry.id} /></td>
    </tr>
  }
  { table === 'contacts' &&
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
