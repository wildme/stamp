import RowActions from './RowActions.js';

const Row = ({ entry }) => (
  <tr className="inbox-item">
    <td>{entry.id}</td>
    <td>{entry.subj}</td>
    <td>{entry.from || entry.to}</td>
    <td>{entry.date}</td>
    <td>{entry.added}</td>
    <td>{entry.note}</td>
    <td>
      <RowActions id={entry.id} />
    </td>
  </tr>
);

export default Row;