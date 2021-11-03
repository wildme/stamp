import RowActions from './RowActions.js';

const Row = ({ entry }) => (
  <tr className="inbox-item">
    <td>{entry.id}</td>
    <td>{entry.subject}</td>
    <td>{entry.from || entry.to}</td>
    <td>{new Date(entry.date).toLocaleString('ru-Ru')}</td>
    <td>{entry.addedBy}</td>
    <td>{entry.notes}</td>
    <td><RowActions id={entry.id} /></td>
  </tr>
);

export default Row;
