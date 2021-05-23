import { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';

const RowActions = ({id}) => {
    const [visibility, setVisibility] = useState(false);
    const dropdownRef = useRef(null);
    const handleClick = (e) => {
        e.preventDefault();
        if (dropdownRef.current !== null && !dropdownRef.current.contains(e.target)) {
            setVisibility(!visibility);
        }
    };

    useEffect(() => {
        if (visibility) {
            document.addEventListener("click", handleClick);
        }
        return () => {
            document.removeEventListener("click", handleClick);
        }
    }, [visibility]);

    return (
        <div className="actions">
            <div className="kebab-icon" >
                <a href="#" onClick={(e) => handleClick(e)} >
                    <svg id="menu" width="18" height="18" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="50%" cy="3" r="2" fill="black"/>
                        <circle cx="50%" cy="9" r="2" fill="black"/>
                        <circle cx="50%" cy="15" r="2" fill="black"/>
                    </svg>
                </a>
                    <div className={ visibility ?
                        "dropdown-content" :
                        "dropdown-content-hidden"
                        }
                        ref={dropdownRef}
                    >
                        <ul id="row-dropdown">
                            <li><NavLink to={`/inbox/edit/${id}`}>Edit</NavLink></li>
                        </ul>
                    </div>
            </div>
        </div>

    );
};
export default RowActions;
