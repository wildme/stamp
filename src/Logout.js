import { Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const dispatch = useDispatch();

  fetch("/api/logout")
    .then(res => {
      if (res.ok) {
        localStorage.removeItem('at');
        dispatch({ type: 'LOGOUT', payload: { user: { loggedIn: false },
          info: null, settings: null } });
      }
    })
    .catch((e) => console.error(e))
  return <Navigate to="/login" replace />;
};

export default Logout;
