import { Navigate, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

const onPageReload = (dispatch, navigate, location) => {
  const url = "/api/page-reload";
  fetch(url)
    .then(res => {
      if (res.status === 200) {
        return res.json();
      }
      if (res.status === 401) {
        localStorage.removeItem('at');
        dispatch({ type: 'INFO', payload: { info: null } });
        dispatch({ type: 'SETTINGS', payload: { settings: null } });
        dispatch({ type: 'LOGIN', payload: { user:
          { username: null, admin: null, loggedIn: false } }});
        return 1;
      }
      if (res.status === 500) {
        return 1;
      }
    })
    .then(data => {
      if (data !== 1) {
        localStorage.setItem('at', data.token);
        dispatch({ type: 'INFO', payload:
          { info: { fullname: data.user.fullname, email: data.user.email }} });
        dispatch({ type: 'SETTINGS', payload: { settings: data.settings } });
        dispatch({ type: 'LOGIN', payload:
          { user: { username: data.user.username,
            admin: data.user.admin, loggedIn: true } }});
        navigate(location.pathname);
      }
    })
    .catch((e) => console.error(e));
};

const PrivateRoute = ({ children }) => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  if (!user) {
    onPageReload(dispatch, navigate, location);
    return <p></p>;
  }
  return (user.loggedIn ?
    children :
    <Navigate to="/login" state={{from: location}} />
  );
};

export default PrivateRoute;
