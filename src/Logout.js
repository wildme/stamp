import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  fetch("/api/logout")
    .then(res => {
      if (res.ok) {
        history.push("/login");
        dispatch({ type: 'LOGOUT', payload: { user: { loggedIn: false },
          token: null, info: null, settings: null } });
      }
    })
    .catch((e) => console.error(e))
  return null;
};

export default Logout;
