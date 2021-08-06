import './App.css';
import { Fragment } from 'react';
import Main from './Main.js';
import NewRecord from './NewRecord.js';
import EditRecord from './EditRecord.js';
import Logout from './Logout.js';
import { Route } from 'react-router-dom';

const Content = ({ user }) => {
  return (
    <Fragment>
      <header>
        <Route exact path="/" render={() => <h1>Hello, {user}</h1>} />
      </header>
      <main>
        <Route exact path="/inbox" component={Main} />
        <Route exact path="/outbox" component={Main} />
        <Route exact path="/inbox/new" component={NewRecord} />
        <Route exact path="/outbox/new" component={NewRecord} />
        <Route exact path="/inbox/edit/:id" component={EditRecord} />
        <Route exact path="/outbox/edit/:id" component={EditRecord} />
        <Route exact path="/logout" component={Logout} />
      </main>
    </Fragment>
  );
};

export default Content;
