import { useState } from 'react';
import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import PersonalInfo from './PersonalInfo.js';
import Email from './Email.js';
import Password from './Password.js';
import FlashMessage from './FlashMessage.js';

const UserProfile = () => {
  const { path, url } = useRouteMatch();
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0 });
  const username = useSelector((state) => state.user.username);
  const fullname = useSelector((state) => state.info.fullname);
  const [name1, name2] = fullname.split(' ');
  const { t } = useTranslation();

  return (
    <div className="user-profile-grid-container">
    { infoMsg.str && <FlashMessage msg={infoMsg.str} id={infoMsg.id } /> }
      <div className="user-profile-container">
        <div className="user-profile-title">
          <h2>{ fullname }</h2>
          <p>{ t('userProfile.subTitle') }</p>
        </div>
        <div className="user-profile-navbar">
          <ul>
            <li>
              <Link to={`${path}`} id="active">{ t('userProfile.item1') }</Link>
            </li>
            <li>
              <Link to={`${path}/e-mail`}>{ t('userProfile.item2') }</Link>
            </li>
            <li>
              <Link to={`${path}/password`}>{ t('userProfile.item3') }</Link>
            </li>
          </ul>
        </div>
        <div className="user-profile-info">
          <Switch>
            <Route path={`${url}/e-mail`}
              render={() =>
                <Email
                  user={username}
                  t={t}
                  setter={setInfoMsg}
                />
              }
            />
            <Route path={`${url}/password`}
              render={() =>
                  <Password
                    user={username}
                    t={t}
                    setter={setInfoMsg}
                  />
              }
            />
            <Route path="*"
              render={() =>
                  <PersonalInfo
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
      </div>
    </div>
  );
};

export default UserProfile;
