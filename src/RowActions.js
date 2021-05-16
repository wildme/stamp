import { useState } from 'react';
const RowActions = ({props}) => {
    const [tableCheckbox, setTableCheckbox] = useState(false);
    return (
        <svg id="menu" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
            <a href="#">
                <circle cx="5" cy="5" r="2" fill="black"/>
                <circle cx="5" cy="10" r="2" fill="black"/>
                <circle cx="5" cy="15" r="2" fill="black"/>
            </a>
        </svg>
    );
};
export default RowActions;
