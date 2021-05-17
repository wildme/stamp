import { useState } from 'react';
const RowActions = ({props}) => {
    const handleClickKebab = (e) => {
        e.preventDefault();
        return;
    }
    return (
        <div className="dropdown">
            <a href="#menu" onClick={(e) => handleClickKebab(e)}>
                <svg id="menu" width="17" height="17" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="50%" cy="3" r="2" fill="black"/>
                    <circle cx="50%" cy="9" r="2" fill="black"/>
                    <circle cx="50%" cy="15" r="2" fill="black"/>
                </svg>
            </a>
            <ul id="row-dropdown" className="dropdown-content">
                <li><a href="#edit">Edit</a></li>
            </ul>
        </div>

    );
};
export default RowActions;
