import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';

const Logout = () => {
  const dispatch = useDispatch();

  fetch('/api/logout');
  dispatch({ type: 'LOGOUT', payload: { user: 'empty', token: 'empty' }});
  return <Redirect to='/login' />
};

export default Logout;
