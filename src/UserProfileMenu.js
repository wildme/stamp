import { NavLink } from 'react-router-dom';

const UserProfileMenu = (props) => {
  const t = props.t;
    
  return (
    <div className="user-profile__navbar">
      <ul className="user-profile__navbar_list">
        <li>
          <NavLink
            className="user-profile__navbar_link"
            exact
            to="/my-profile">
            {t('userProfile.item1')}
          </NavLink>
        </li>
        <li>
          <NavLink
            className="user-profile__navbar_link"
            exact
            to="/my-profile/e-mail">
            {t('userProfile.item2')}
          </NavLink>
        </li>
        <li>
          <NavLink
            className="user-profile__navbar_link"
            exact
            to="/my-profile/password">
            {t('userProfile.item3')}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserProfileMenu;
