import { NavLink } from 'react-router-dom';
import { stampMenu as menu } from './stampMenu.js';

const UserProfileMenu = () => {
  return (
    <div className="user-profile-navbar">
      <ul className="user-profile-navbar-list">
        {menu['userProfile'].map((link, i) => {
          return (
            <li key={i}>
              <NavLink
                className={({ isActive }) => {
                  return isActive ? "user-profile-navbar__link_active" :
                    "user-profile-navbar__link"}}
                end
                to={link.to}>
                {link.name}
              </NavLink>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default UserProfileMenu;
