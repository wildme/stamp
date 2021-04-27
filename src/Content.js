import './App.css';
import { Fragment } from 'react';
import {InboxHeader, OutboxHeader, InboxMain } from './Main.js';
import Hello from './Hello.js';
import NewInbox from './NewInbox.js';
import Logout from './Logout.js';
import { Route } from "react-router-dom";

const Content = () => {
    return(
        <Fragment>
         <header>
          <Route exact path="/" component={Hello} />
          <Route exact path="/inbox" component={InboxHeader} />
          <Route exact path="/outbox" component={OutboxHeader} />
         </header>
         <main>
          <Route exact path="/inbox" component={InboxMain} />
          <Route exact path="/inbox/new" component={NewInbox} />
          <Route exact path="/logout" component={Logout} />
         </main>
        </Fragment>
    );
}
export default Content;
