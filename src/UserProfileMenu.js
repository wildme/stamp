import { NavLink } from 'react-router-dom';

const UserProfileMenu = (props) => {
  const t = props.t;
    
  return (
    <div className="user-profile-navbar">
      <ul>
        <li>
          <NavLink exact to="/my-profile">{t('userProfile.item1')}</NavLink>
        </li>
        <li>
          <NavLink exact to="/my-profile/e-mail">{t('userProfile.item2')}</NavLink>
        </li>
        <li>
          <NavLink exact to="/my-profile/password">{t('userProfile.item3')}</NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserProfileMenu;
