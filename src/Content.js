import './App.css';
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

export default function Content() {
    return(
        <Router>
         <header>
          <Route exact path="/" render ={ () => <h1>Welcome</h1>} />
          <Route exact path="/inbox" component={InboxHeader} />
          <Route exact path="/outbox" render={ () => <h3>Outbox</h3>} />
         </header>
         <main>
          <Route exact path="/inbox" component={InboxMain} />
         </main>
        </Router>
    );
}

function InboxHeader() {
    return <h3>Inbox</h3>
}

function InboxMain() {
    return (
        <div className="main">
          <div className="panel">
            <button>New</button>
            <button>Edit</button>
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
              <tr>
                <td>1</td>
                <td>Test</td>
                <td>Big Corp.</td>
                <td>Konstantin</td>
                <td>1-01-2021</td>
                <td>test test</td>
                <td>Document.doc</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Test2</td>
                <td>Ajax</td>
                <td>Konstantin</td>
                <td>1-01-2021</td>
                <td>test2 test</td>
                <td>Document.docx</td>
              </tr>
            </table>
          </div>  
          </div>
    );
}
