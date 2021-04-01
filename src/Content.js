import './App.css';
import { InboxHeader, InboxMain } from './Main.js';
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
          <Route exact path="/" render ={ () => <h1>Welcome</h1>} />
          <Route exact path="/inbox" component={InboxHeader} />
          <Route exact path="/outbox" render={ () => <h3>Outbox</h3>} />
         </header>
         <main>
          <Route exact path="/inbox" component={InboxMain} />
          <Route exact path="/logout" component={Login} />
         </main>
        </Router>
    );
}
