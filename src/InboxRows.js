import { connect } from 'react-redux';
import Inbox from './Inbox.js';

const InboxRows = ({inbox}) => (
    inbox.map((row) => {
        return <Inbox  entry={row} />;
    })
);

const mapStateToProps = state => {
    const { inbox } = state;
    return { inbox };
}

export default connect(mapStateToProps)(InboxRows);
