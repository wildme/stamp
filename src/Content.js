import { Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import Box from './Box.js';
import Directives from './Directives.js';
import HomePage from './HomePage.js';
import NewRecord from './NewRecord.js';
import NewDirective from './NewDirective.js';
import Signup from './Signup.js';
import EditRecord from './EditRecord.js';
import EditDirective from './EditDirective.js';
import RecordCard from './RecordCard.js';
import DirectiveCard from './DirectiveCard.js';
import Logout from './Logout.js';
import Login from './Login.js';
import Contacts from './Contacts.js';
import NewContact from './NewContact.js';
import ErrorPage from './ErrorPage.js';
import UserProfile from './UserProfile.js';
import PrivateRoute from './PrivateRoute.js';

const Content = () => {
  return (
    <Fragment>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/logout"
          element={
            <PrivateRoute>
              <Logout />
            </PrivateRoute>
          }
        />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          }
        />
        <Route
          path="/contacts/new"
          element={
            <PrivateRoute>
              <NewContact />
            </PrivateRoute>
          }
        />
        <Route
          path="/letters"
          element={
            <PrivateRoute>
              <Box />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-profile/*"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
        <Route
          path="/:box/new"
          element={
            <PrivateRoute>
              <NewRecord />
            </PrivateRoute>
          }
        />
        <Route
          path="/:box/view/:id"
          element={
            <PrivateRoute>
              <RecordCard />
            </PrivateRoute>
          }
        />
        <Route
          path="/directive/edit/:id"
          element={
            <PrivateRoute>
              <EditDirective />
            </PrivateRoute>
          }
        />
        <Route
          path="/:box/edit/:id"
          element={
            <PrivateRoute>
              <EditRecord />
            </PrivateRoute>
          }
        />
        <Route
          path="/directives"
          element={
            <PrivateRoute>
              <Directives />
            </PrivateRoute>
          }
        />
        <Route
          path="/directive/new"
          element={
            <PrivateRoute>
              <NewDirective />
            </PrivateRoute>
          }
        />
        <Route
          path="/directive/view/:id"
          element={
            <PrivateRoute>
              <DirectiveCard />
            </PrivateRoute>
          }
        />
        <Route
          path="*"
          element={
            <PrivateRoute>
              <ErrorPage />
            </PrivateRoute>
          }
        />
      </Routes>
    </Fragment>
  );
};

export default Content;
