import RowActions from './RowActions.js';

const Inbox = ({entry}) => (
    <tr className="inbox-item">
        <td>{entry.id}</td>
        <td>{entry.subj}</td>
        <td>{entry.from}</td>
        <td>{entry.date}</td>
        <td>{entry.added}</td>
        <td>{entry.note}</td>
        <td><RowActions id={entry.id} /></td>
    </tr>
);

export default Inbox;
