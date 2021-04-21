import './App.css';
import { Hello, InboxHeader, OutboxHeader, InboxMain } from './Main.js';
import { NewInbox } from './NewRecord.js';
import Login from './Login.js';
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";

export default function Content() {
    return(
        <Router>
         <header>
          <Route exact path="/" component={Hello} />
          <Route exact path="/inbox" component={InboxHeader} />
          <Route exact path="/outbox" component={OutboxHeader} />
         </header>
         <main>
          <Route exact path="/inbox" component={InboxMain} />
          <Route exact path="/inbox/new" component={NewInbox} />
          <Route exact path="/logout" component={Login} />
          <Route exact path="/login" component={Login} />
         </main>
        </Router>
    );
}
