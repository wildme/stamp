import { NavLink } from 'react-router-dom';

const TableTabs = (props) => {
  const defaultValue = props.defaultValue || 'outbox';
  const queryString = props.queryString || '/letters?box=';
  const className = props.className || 'box-tabs';
  const tabs = props.tabs || ['inbox', 'outbox'];
  const tabTitles = props.tabTitles || ['inbox', 'outbox'];

  return (
    <div className={classname}>
      <ul className=`${className}_list`>
        <li>
          <NavLink
            className={`${className}__button`}
            to={queryString}>
            Inbox
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default TableTabs;
