import { Switch, Route } from 'react-router-dom';
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
      <Switch>
        <Route path="/my-profile/e-mail"
          render={() =>
            <UserEmail
              user={username}
              t={t}
              setter={setInfoMsg}
            />
          }
        />
        <Route path="/my-profile/password"
          render={() =>
              <UserPassword
                user={username}
                t={t}
                setter={setInfoMsg}
              />
          }
        />
        <Route path="/my-profile/settings"
          render={() =>
              <UserSettings
                user={username}
                settings={settings}
                t={t}
                setter={setInfoMsg}
              />
          }
        />
        <Route path="*"
          render={() =>
              <UserInfo
                user={username}
                name1={name1}
                name2={name2}
                t={t}
                setter={setInfoMsg}
              />
          }
        />
      </Switch>
    </div>
  );
};

export default UserProfileContent;
