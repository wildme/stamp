import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import PersonalInfo from './PersonalInfo.js';
import Email from './Email.js';
import Password from './Password.js';

const UserProfile = () => {
  const { path, url } = useRouteMatch();
  const user = useSelector((state) => state.user.username);
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    fetch(`/api/user/${user}`, { signal })
      .then(res => {
        if (res.status === 200) return res.json();
      })
      .then(data => {
        setFirstname(data.firstname);
        setLastname(data.lastname);
        setEmail(data.email);
      })
      .catch((e) => console.error(e))

    return () => { abortController.abort(); };
  }, [user]);

  return (
    <div className="user-profile-grid-container">
      <div className="user-profile-container">
        <div className="user-profile-title">
          <h2>{firstname} {lastname}</h2>
          <p>Your profile</p>
        </div>
        <div className="user-profile-navbar">
          <ul>
            <li><Link to={`${path}`} id="active">Personal info</Link></li>
            <li><Link to={`${path}/e-mail`}>Email</Link></li>
            <li><Link to={`${path}/password`}>Password</Link></li>
          </ul>
        </div>
        <div className="user-profile-info">
          <Switch>
            <Route path={`${url}/e-mail`} render={() =>
                <Email user={user} email={email} setter={setEmail} />}
            />
            <Route path={`${url}/password`} render={() =>
                <Password user={user} />}
            />
            <Route path="*" render={() =>
              <PersonalInfo user={user} firstname={firstname}
                lastname={lastname} setterF={setFirstname}
              setterL={setLastname} />}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
