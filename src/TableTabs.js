const TableTabs = (props) => {
  const containerClassName = props.containerClassName;
  const tabsClassName = props.tabsClassName;
  const tabClassName = props.tabClassName;
  const activeTabClassName = props.activeTabClassName;
  const tabs = props.tabs;
  const tabTitles = props.tabTitles;
  const selectedTab = props.selectedTab;
  const setter = props.setter;

  const handleClick = (e) => {
    let tabs = document.getElementsByClassName(tabClassName);
    for (let i = 0; i < tabs.length; i++) {
      tabs[i].className = tabs[i].className.replace(activeTabClassName, "");
    }
    e.currentTarget.className += ` ${activeTabClassName}`;
    setter(e.target.value);
  }

  return (
    <div className={containerClassName}>
      <div className={tabsClassName}>
        {tabs.map((tab, i) => (
          <button
            className={tabClassName +
              (tab === selectedTab ? ` ${activeTabClassName}` : "")}
            type="button"
            value={tab}
            key={i}
            onClick={(e) => handleClick(e)}>{tabTitles[i]}
          </button>
        ))}
      </div>
    </div>
  );
};

export default TableTabs;
