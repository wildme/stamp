import React, { useState, Fragment } from 'react';

const Autocomplete = ({options}) => {
    const [matches, setMatches] = useState([]);
    const [activeItem, setActiveItem] = useState(0);
    const [visibility, setVisibility] = useState(false);
    const [userInput, setUserInput] = useState("");

    const onKeyDown = (e) => {
        if (e.keyCode === 13) {
            setActiveItem(0);
            setVisibility(false);
            setUserInput(matches[activeItem]);
        }
        else if (e.keyCode === 38) {
            if (activeItem === 0) {
                return;
            }
            setActiveItem(activeItem - 1);
        }
        else if (e.keyCode === 40) {
            if (activeItem - 1 === matches.length) {
                return;
            }
            setActiveItem(activeItem + 1);
        }
    };
    
    const onChange = (e) => {
        setUserInput(e.currentTarget.value);
        setMatches(() => options.filter(
            (option) => 
            option.toLowerCase().indexOf(userInput.toLowerCase()) > -1
        )); 
        
        setVisibility(true);
        setActiveItem(0);
    };

    const onClick = (e) => {
        setUserInput(e.currentTarget.innerText);
        setMatches([]);
        setVisibility(false);
        setActiveItem(0);
    };

    let optionList;
    if (visibility && userInput) {
        if (matches.length) {
            optionList = (
            <ul className="options">
                {matches.map((match, index) => {
                    let className;
                    if (index === activeItem) {
                        className="active-item";
                    }
                    return (
                        <li 
                            className={className}
                            key={match}
                            onClick={onClick}>{match}
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
        <input
            type="text"
            name="from"
            value={userInput}
            onChange={onChange}
            onKeyDown={onKeyDown}
        />
        {optionList}
        </Fragment>
    );
};
export default Autocomplete;
