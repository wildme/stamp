import { useSelector } from 'react-redux';

const Hello = () => {
  const user = useSelector((state) => state.user);
  return <h1>Hello, { user.username }</h1>
}

export default Hello;
