import Inbox from './Inbox.js';

const InboxRows = ({ rows }) =>
  rows.map((row) => {
    return <Inbox entry={row} />;
  });
export default InboxRows;
