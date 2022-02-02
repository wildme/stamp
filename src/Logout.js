import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const dispatch = useDispatch();

  (async () => {
    await fetch("/api/logout")
      .then(res => {
        if (res.ok) {
          dispatch({ type: 'LOGOUT', payload: { user: 'empty', token: 'empty' }});
        }
        if (!res.ok) throw new Error('Network issue occured');
      })
      .catch((e) => console.error(e))
  })();

  return <Redirect to='/login' />
};

export default Logout;
