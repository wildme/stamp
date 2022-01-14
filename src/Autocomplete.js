import React, { useState, Fragment } from 'react';

const Autocomplete = ({ value, setter, attrs, field }) => {
  const [matches, setMatches] = useState([]);
  const [activeItem, setActiveItem] = useState(0);
  const [visibility, setVisibility] = useState(false);

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setActiveItem(0);
      setVisibility(false);
      setter(matches[activeItem]);
    } else if (e.keyCode === 38) {
      if (activeItem === 0) {
        return;
      }
      setActiveItem(activeItem - 1);
    } else if (e.keyCode === 40) {
      if (activeItem - 1 === matches.length) {
        return;
      }
      setActiveItem(activeItem + 1);
    }
  };

  const onChange = (e) => {
    setter(e.currentTarget.value);
   // setMatches(() =>
   //   options.filter(
   //     (option) => option.toLowerCase().indexOf(value.toLowerCase()) > -1
   //   )
   // );
      fetch(`/api/contacts/search/by-${field}` + `?name=${value}`)
        .then(res => res.json())
        .then(data => console.log(data))

    setVisibility(true);
    setActiveItem(0);
  };

  const onClick = (e) => {
    setter(e.currentTarget.innerText);
    setMatches([]);
    setVisibility(false);
    setActiveItem(0);
  };

  let optionList;
  if (visibility && value) {
    if (matches.length) {
      optionList = (
        <ul className="options">
          {matches.map((match, index) => {
            let className;
            if (index === activeItem) {
              className = 'active-item';
            }
            return (
              <li className={className} key={match} onClick={onClick}>
                {match}
              </li>
            );
          })}
        </ul>
      );
    } else {
      optionList = (
        <div className="no-options">
          <em>No matches</em>
        </div>
      );
    }
  }
  return (
    <Fragment>
      <label htmlFor={attrs.for}>
        <b>{attrs.text}</b>
      </label>
      <input
        type={attrs.type}
        name={attrs.name}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
      />
      {optionList}
    </Fragment>
  );
};
export default Autocomplete;
