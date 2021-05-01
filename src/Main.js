import { NavLink } from 'react-router-dom';
import InboxRows from './InboxRows.js';

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
                <th>#</th>
                <th>Subject</th>
                <th>Sender</th>
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
