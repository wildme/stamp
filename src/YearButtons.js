const YearButtons = (props) => {
  const containerClassName = props.containerClassName;
  const buttonClassName = props.buttonClassName;
  const activeButtonClassName = props.activeButtonClassName;
  const years = props.years;
  const setter = props.setter;

  const handleYearClick = (e) => {
    const buttons = document.getElementsByClassName(buttonClassName);
    for (let i = 0; i < buttons.length; i++) {
      buttons[i].className = buttons[i].className.replace(activeButtonClassName, "");
    }
    e.currentTarget.className += ` ${activeButtonClassName}`;
    setter(e.target.value);
  }

  return (
    <div className={containerClassName}>
      {years.map((item, i) => (
        <button
          key={i}
          value={item}
          className={buttonClassName}
          onClick={(e) => handleYearClick(e)}>{item}
        </button>))}
    </div>
  );
};

export default YearButtons;
