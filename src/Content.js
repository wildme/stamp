import './App.css';
import { connect } from 'react-redux';
import { Fragment } from 'react';
import InboxMain from './Main.js';
import NewInbox from './NewInbox.js';
import Logout from './Logout.js';
import { Route } from "react-router-dom";

const Content = ({user}) => {
    return(
        <Fragment>
         <header>
          <Route exact path="/" render={() => <h1>Hello, {user.name}</h1>} />
          <Route exact path="/inbox" render={() => <h2>Inbox</h2>} />
          <Route exact path="/outbox"  render={() => <h2>Outbox</h2>} />
         </header>
         <main>
          <Route exact path="/inbox" component={InboxMain} />
          <Route exact path="/inbox/new" component={NewInbox} />
          <Route exact path="/inbox/edit/:id" component={NewInbox} />
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
