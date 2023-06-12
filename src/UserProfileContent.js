import { Routes, Route } from 'react-router-dom';
import UserInfo from './UserInfo.js';
import UserEmail from './UserEmail.js';
import UserPassword from './UserPassword.js';
import UserSettings from './UserSettings.js';

const UserProfileContent = (props) => {
  const t = props.t;
  const username = props.username;
  const fullname = props.fullname;
  const setInfoMsg = props.setInfoMsg;
  const settings = props.settings;
  const [name1, name2] = fullname.split(' ');

  return (
    <div className="user-profile-info">
      <Routes>
        <Route path="e-mail"
          element={
            <UserEmail
              user={username}
              t={t}
              setter={setInfoMsg}
            />
          }
        />
        <Route path="password"
          element={
              <UserPassword
                user={username}
                t={t}
                setter={setInfoMsg}
              />
          }
        />
        <Route path="settings"
          element={
              <UserSettings
                user={username}
                settings={settings}
                t={t}
                setter={setInfoMsg}
              />
          }
        />
        <Route path="*"
          element={
              <UserInfo
                user={username}
                name1={name1}
                name2={name2}
                t={t}
                setter={setInfoMsg}
              />
          }
        />
      </Routes>
    </div>
  );
};

export default UserProfileContent;
