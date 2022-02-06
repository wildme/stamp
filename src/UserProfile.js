import { Link, Switch, Route, useRouteMatch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const Email = () => { return <p>E-mail</p> };
const Password = () => { return <p>Pass</p> };

const UserProfile = () => {
  const { path, url } = useRouteMatch();
  const user = useSelector((state) => state.user.username);
  const [firstname, setFirstname] = useState(null);
  const [lastname, setLastname] = useState(null);
  const [email, setEmail] = useState(null);
  const [data, setNoData] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    (async () => {
      await fetch(`/api/user/${user}`, { signal })
        .then(res => {
          if (res.status === 200) return res.json();
          if (res.status === 204) setNoData(true);;
        })
        .then(data => {
          setFirstname(data.firstname);
          setLastname(data.lastname);
          setEmail(data.email);
        })
        .catch((e) => console.error(e))
    })();

    return () => { abortController.abort(); };
  }, [user]);

  return (
    <div className="user-profile-grid-container">
      <div className="user-profile-title">
        <h2>{firstname} {lastname}</h2>
        <p>Profile</p>
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
          <Route path={`${url}/e-mail`} component={Email} />
          <Route path={`${url}/password`} component={Password} />
          <div>Profile</div>
        </Switch>
      </div>
    </div>
  );
};

export default UserProfile;
