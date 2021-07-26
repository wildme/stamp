import RowActions from './RowActions.js';

const Row = ({ entry }) => (
  <tr className="inbox-item">
    <td>{entry.id}</td>
    <td>{entry.subject}</td>
    <td>{entry.from || entry.to}</td>
    <td>{entry.date}</td>
    <td>{entry.addedBy}</td>
    <td>{entry.notes}</td>
    <td>
      <RowActions id={entry.id} />
    </td>
  </tr>
);

export default Row;
