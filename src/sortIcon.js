import { Fragment } from 'react';

const SortIcon = ({direction = ""}) => {
    return (
     <Fragment className={`sort-icon-${direction}`}>
        <span className="arrow-up">▲</span><span className="arrow-down">▼</span>
     </Fragment>
    );
};
export default SortIcon;
