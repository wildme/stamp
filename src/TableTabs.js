const TableTabs = (props) => {
  const tabs = props.tabs;
  const tabTitles = props.tabTitles;
  const selectedTab = props.selectedTab;
  const className = props.className;
  const setter = props.setter;

  const handleClick = (e) => {
    let tabs = document.getElementsByClassName(`${className}__button`);
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace(" active", "");
    }
    e.currentTarget.className += " active";
    setter(e.target.value);
  }

  return (
    <div className={className}>
    {tabs.map((tab, i) => (
      <button
        className={`${className}__button` +
          (tab === selectedTab ? " active" : "")}
        type="button"
        value={tab}
        key={i}
        onClick={(e) => handleClick(e)}>{tabTitles[i]}
      </button>
    ))}
    </div>
  );
};

export default TableTabs;
