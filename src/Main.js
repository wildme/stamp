import { useState } from 'react';

export function InboxHeader() {
    return (<h2>Inbox</h2>);
}

export function OutboxHeader() {
    return (<h2>Outbox</h2>);
}

export function Hello() {
    const [name] = useState('Stranger');
    return (<h1>Hello, {name}</h1>);
}

export function InboxMain() {
    return (
        <div className="main">
          <div className="mainPanel">
            <a href="/inbox/new">New</a>
            <a href="/inbox/edit">Edit</a>
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
