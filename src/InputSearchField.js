import { Fragment, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';

function logout(dispatch) {
  dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
}

const InputSearchField = (props) => {
  const [results, setResults] = useState([]);
  const [pattern, setPattern] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [visibility, setVisibility] = useState(false);
  const [activeItem, setActiveItem] = useState(0);
  const dispatch = useDispatch();
  const url = props.url;
  const attrs = props.attrs;
  const setter = props.setter;
  const inputClassName = props.inputClassName;
  const labelClassName = props.labelClassName;
  const listClassName = props.listClassName;
  const itemClassName = props.itemClassName;
  const activeItemClassName = props.activeItemClassName;
  const noMatchesClassName = props.noMatchesClassName;
  const noMatchesMsg = props.noMatchesMsg;
  const prefix = props.prefix;
  let optionList;

  const onClick = (e) => {
    const value = e.currentTarget.innerText.replace(prefix, '');
    setter(value);
    setInputValue(value);
    setVisibility(false);
    setActiveItem(0);
  };

  const onKeyDown = (e) =>  {
    if (e.key === 'Enter') {
      const value = results[activeItem].replace(prefix, '');
      setter(value);
      setInputValue(value);
      setVisibility(false);
      setActiveItem(0);
      return;
    }
    if (e.key === 'ArrowUp') {
      if (activeItem === 0) {
        return;
      }
      setActiveItem(activeItem - 1);
    }
    if (e.key === 'ArrowDown') {
      if (activeItem === results.length - 1) {
        return;
      }
      setActiveItem(activeItem + 1);
    }
  };

  if (visibility && pattern) {
    if (results.length) {
      optionList = (
        <ul className={listClassName}>
          {results.map((match, i) => {
            return (
              <li
                className={(i === activeItem) ? activeItemClassName : itemClassName}
                key={i}
                onClick={(e) => onClick(e)}
              >{prefix}{match}
              </li>
              );
            })}
        </ul>
      );
    } else {
      optionList = (<div className={noMatchesClassName}>{noMatchesMsg}</div>);
    }
  }

  useEffect(() => {
    const token = localStorage.getItem('at');
    const abortController = new AbortController();
    if (pattern === '') {
      setActiveItem(0);
      return;
    }
  
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({value: pattern})
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          logout(dispatch);
          return 1;
        }
        if (res.status === 500) {
          console.log("Couldn't fetch data");
          return 1;
        }
      })
      .then(data => {
        if (data.token) {
          localStorage.setItem('at', data.token);
        }
        if (data.result) {
          setResults(data.result);
          setVisibility(true);
        }
      })
      .catch((e) => console.error(e))
  
      return () => {abortController.abort()};
  }, [pattern, url, dispatch])

  return (
    <Fragment>
      <label htmlFor={attrs.for} className={labelClassName}>
        {attrs.text}
      </label>
      <input
        className={inputClassName}
        type={attrs.type}
        name={attrs.name}
        value={inputValue}
        onChange={(e) => {setInputValue(e.target.value); setPattern(e.target.value)}}
        onKeyDown={(e) => {onKeyDown(e)}}
      />
      {optionList}
    </Fragment>
  );
};

export default InputSearchField;
