const TableTabs = (props) => {
  const setter = props.setter;
  const defaultValue = props.defaultValue || 'outbox';
  const className = props.className;
  const tabs = props.tabs || ['inbox', 'outbox'];
  const tabTitles = props.tabTitles || ['inbox', 'outbox'];
  const handleClick = (e) => {
    let tabs = document.getElementsByClassName(`${className}__button`);
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace(" active", "");
    }
    e.currentTarget.className += " active";
  }

  return (
    <div className={className}>
      <button
        className={`${className}__button active`}
        type="button"
        value="inbox"
        onClick={(e) => handleClick(e)}>Inbox
      </button>
      <button
        className={`${className}__button`}
        type="button"
        value="outbox"
        onClick={(e) => handleClick(e)}>Outbox
      </button>
    </div>
  );
};

export default TableTabs;
