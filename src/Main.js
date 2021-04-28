import { NavLink } from 'react-router-dom';

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
                <th>File</th>
              </tr>
            </table>
          </div>  
        </div>
    );
}
