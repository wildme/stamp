import { Link } from 'react-router-dom';

const TableTabs = (props) => {
  const defaultValue = props.defaultValue || 'outbox';
  const queryString = props.queryString || '/letters?box=';
  const className = props.className;
  const tabs = props.tabs || ['inbox', 'outbox'];
  const tabTitles = props.tabTitles || ['inbox', 'outbox'];

  return (
    <div className={className}>
          <Link
            className={`${className}_link`}
            to={queryString + 'inbox'}>
            Inbox
          </Link>
          <Link
            className={`${className}_link`}
            to={queryString + 'outbox'}>
            Outbox
          </Link>
    </div>
  );
};

export default TableTabs;
