import { useState } from 'react';
import { NavLink } from 'react-router-dom';

const RowActions = ({props}) => {
    const [hidden, setHidden] = useState(true);
    const handleClick = (e) => {
        e.preventDefault();
        setHidden(!hidden);
    };
    return (
        <div className="dropdown">
            <div className="kebab-icon">
                <a href="#"  onClick={(e) => handleClick(e)} >
                    <svg id="menu" width="17" height="17" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="15%" cy="3" r="2" fill="black"/>
                        <circle cx="15%" cy="9" r="2" fill="black"/>
                        <circle cx="15%" cy="15" r="2" fill="black"/>
                    </svg>
                </a>
                    <div className={ hidden ? "dropdown-content-hidden" : "dropdown-content" }>
                        <ul id="row-dropdown" >
                            <li><NavLink to="/inbox/new">Edit</NavLink></li>
                        </ul>
                    </div>
            </div>
        </div>

    );
};
export default RowActions;
