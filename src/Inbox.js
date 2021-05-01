const Inbox = ({entry}) => (
    <tr>
        <td>{entry.id}</td>
        <td>{entry.subj}</td>
        <td>{entry.sender}</td>
        <td>{entry.date}</td>
        <td>{entry.added}</td>
        <td>{entry.note}</td>
    </tr>
);

export default Inbox;
