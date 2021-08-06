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
        <Route exact path="/logout" component={Logout} />
        <Route exact path="/inbox" component={Main} />
        <Route exact path="/outbox" component={Main} />
        <Route exact path="/:box/new" component={NewRecord} />
        <Route exact path="/:box/edit/:id" component={EditRecord} />
      </main>
    </Fragment>
  );
};

export default Content;
