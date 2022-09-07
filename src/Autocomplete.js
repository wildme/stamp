import { useState, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Autocomplete = (props) => {
  const token = useSelector((state) => state.token.string);
  const dispatch = useDispatch();
  const [matches, setMatches] = useState([]);
  const [activeItem, setActiveItem] = useState(0);
  const [visibility, setVisibility] = useState(false);
  const value = props.value;
  const setter = props.setter;
  const attrs = props.attrs;
  const field = props.field;
  const t = props.t;
  const className = props.className;

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
    const url = `/api/contacts/search/by-${field}?name=${value}`;
    setter(e.currentTarget.value);
    fetch(url, {
      headers: {'Authorization': `Bearer ${token}`}
    })
      .then(res => res.json())
      .then(data => {
        if (data.token) {
          dispatch({ type: 'TOKEN', payload: { token: { string: data.token } }});
        }
        return data.contacts.map(item => [item.name, item.location].join(', '));
      })
      .then(matches => setMatches(matches))
      .catch((e) => console.error(e))

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
        <div>
          <ul className="options">
            {matches.map((match, index) => {
              let className;
              if (index === activeItem) {
                className = 'active-item';
              }
              return (
                <li
                  className={className}
                  key={match}
                  onClick={onClick}
                >
                  {match}
                </li>
              );
            })}
          </ul>
        </div>
      );
    } else {
      optionList = (
        <div className="no-options"><em>{t('autocomplete.string1')}</em></div>
      );
    }
  }
  return (
    <Fragment>
      <label htmlFor={attrs.for}><b>{t(attrs.text)}</b></label>
      <input
        className={className}
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
