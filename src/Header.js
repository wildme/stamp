import './App.css';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HeaderLinks = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <NavLink to="/inbox">Inbox</NavLink>
        <NavLink to="/outbox">Outbox</NavLink>
      </div>
      <div className="navbar-right">
        <NavLink to="/logout">Logout</NavLink>
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

const Header = () => {
  const user = useSelector((state) => state.user);
  return user !== 'empty' ? <HeaderLinks /> : <HeaderBlank />;
};

export default Header;
