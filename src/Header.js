import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeaderLinks = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/inbox">Inbox</Link>
        <Link to="/outbox">Outbox</Link>
        <Link to="/contacts">Contacts</Link>
      </div>
      <div className="navbar-right">
        <Link to="/my-profile">Profile</Link>
        <Link to="/logout">Logout</Link>
      </div>
    </div>
  );
};

const HeaderBlank = () => {
  return (
    <div className="navbar">
      <div className="navbar-left"></div>
      <div className="navbar-right"></div>
    </div>
  );
};

export const Header = () => {
  const user = useSelector((state) => state.user);
  return user !== 'empty' ? <HeaderLinks /> : <HeaderBlank />;
};
