import { NavLink } from 'react-router-dom';
import { stampMenu as menu } from './stampMenu.js';

const UserProfileMenu = () => {
  return (
    <div className="user-profile__navbar">
      <ul className="user-profile__navbar_list">
        {menu['userProfile'].map((link, i) => {
          return (
            <li key={i}>
              <NavLink
                className="user-profile__navbar_link"
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
