import { useState, useRef, useEffect, useCallback } from 'react';
import { NavLink } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const RowActions = ({ id }) => {
  const [visibility, setVisibility] = useState(false);
  const dropdownRef = useRef(null);
  const { pathname } = useLocation();
  const box = pathname.slice(1);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    if (
      dropdownRef.current !== null &&
      !dropdownRef.current.contains(e.target)
    ) {
      setVisibility(!visibility);
    }
  }, [visibility] )

  useEffect(() => {
    if (visibility) {
      document.addEventListener('click', handleClick);
    }
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [visibility, handleClick]);

  return (
    <div className="actions">
      <div className="kebab-icon">
        <a href={`${box}#`} onClick={(e) => handleClick(e)}>
          <svg
            id="menu"
            width="16"
            height="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="50%" cy="2" r="2" fill="black" />
            <circle cx="50%" cy="8" r="2" fill="black" />
            <circle cx="50%" cy="14" r="2" fill="black" />
          </svg>
        </a>
        <div className={visibility ?
            'dropdown-content' :
            'dropdown-content-hidden'} ref={dropdownRef}>
          <ul id="row-dropdown">
            <li>
              <NavLink to={`/${box}/edit/${id}`}>Edit</NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default RowActions;
