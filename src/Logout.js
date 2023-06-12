import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  fetch("/api/logout")
    .then(res => {
      if (res.ok) {
        navigate("/login");
        localStorage.removeItem('at');
        dispatch({ type: 'LOGOUT', payload: { user: { loggedIn: false },
          info: null, settings: null } });
      }
    })
    .catch((e) => console.error(e))
  return null;
};

export default Logout;
