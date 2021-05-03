import { NavLink } from 'react-router-dom';
import InboxRows from './InboxRows.js';

const requestSort = () => {
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
                <th><button
                    type="button"
                    onClick={() => requestSort('id')}
                >
                    #
                </button>
                </th>
                <th>Subject</th>
                <th><button
                    type="button"
                    onClick={() => requestSort('Sender')}
                >
                    Sender
                </button>
                </th>
                <th>Date</th>
                <th>User</th>
                <th>Note</th>
              </tr>
                <InboxRows />
            </table>
          </div>  
        </div>
    );
}
