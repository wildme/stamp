import { NavLink } from 'react-router-dom';
import InboxRows from './InboxRows.js';
import { headInbox as head} from './TableHead.js';
import useTableSort from './useTableSort.js';
import SortIcon from './sortIcon.js';

export const InboxMain = () => {
    const { handleSort, sortColumn, sortDirection, tableData } = useTableSort();
    return (
        <div className="main">
          <div className="mainPanel">
            <NavLink to="/inbox/new">New</NavLink>
            <NavLink to="/inbox/edit">Edit</NavLink>
          </div>
          <div className="mainTable">
            <table>
                <thead>
              <tr id="topRow">
                { head.map((item) => {
                    const { id = "", label = "", sortable } = item;
                    const currentItem = sortColumn === id;
                    const direction = currentItem ? sortDirection : ""; 
                    return (
                        <th key={id}>
                            { sortable ? (
                                <button
                                    type="button"
                                    onClick = {() => handleSort(id)}
                                >
                                    {label} <SortIcon direction={direction} />
                                </button>) : label
                            }
                        </th>
                    );
                })}
              </tr>
                </thead>
                <tbody>
                <InboxRows />
                </tbody>
            </table>
          </div>  
        </div>
    );
}
