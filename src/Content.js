import './App.css';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import InboxMain from './Main.js';
import NewInbox from './NewInbox.js';
import EditInbox from './EditInbox.js';
import Logout from './Logout.js';
import { Route } from "react-router-dom";

const Content = ({user}) => {
    return(
        <Fragment>
         <header>
          <Route exact path="/" render={() => <h1>Hello, {user.name}</h1>} />
         </header>
         <main>
          <Route exact path="/inbox" component={InboxMain} />
          <Route exact path="/outbox" component={InboxMain} />
          <Route exact path="/inbox/new" component={NewInbox} />
          <Route exact path="/outbox/new" component={NewInbox} />
          <Route exact path="/inbox/edit/:id" component={EditInbox} />
          <Route exact path="/outbox/edit/:id" component={EditInbox} />
          <Route exact path="/logout" component={Logout} />
         </main>
        </Fragment>
    );
}

const mapStateToProps = (state) => {
    const { user } = state;
    return { user: user }
}
export default connect(mapStateToProps)(Content);
