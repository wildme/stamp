import { NavLink } from 'react-router-dom';
import InboxRows from './InboxRows.js';
import { headInbox as head} from './TableHead.js';

const handleSort = () => {
    return;
}

export const InboxMain = () => {
    return (
        <div className="main">
          <div className="mainPanel">
            <NavLink to="/inbox/new">New</NavLink>
            <NavLink to="/inbox/edit">Edit</NavLink>
          </div>
          <div className="mainTable">
            <table>
              <tr id="topRow">
                { head.map((item) => {
                    const { id = "", label = "", sortable } = item;
                    return (
                        <th key={id}>
                            { sortable ? (
                                <button
                                    type="button"
                                    onClick = {() => handleSort(id)}
                                >
                                    {label}
                                </button>) : label
                            }
                        </th>
                    );
                })}
              </tr>
                <InboxRows />
            </table>
          </div>  
        </div>
    );
}
