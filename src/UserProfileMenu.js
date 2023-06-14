import { NavLink } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const UserProfileMenu = () => {
  const { t } = useTranslation();
  return (
    <div className="user-profile__navbar">
      <ul className="user-profile__navbar_list">
        <li>
          <NavLink
            className="user-profile__navbar_link"
            end
            to="/my-profile">
            {t('userProfile.item1')}
          </NavLink>
        </li>
        <li>
          <NavLink
            className="user-profile__navbar_link"
            end
            to="/my-profile/e-mail">
            {t('userProfile.item2')}
          </NavLink>
        </li>
        <li>
          <NavLink
            className="user-profile__navbar_link"
            end
            to="/my-profile/password">
            {t('userProfile.item3')}
          </NavLink>
        </li>
        <li>
          <NavLink
            className="user-profile__navbar_link"
            end
            to="/my-profile/settings">
            {t('userProfile.item4')}
          </NavLink>
        </li>
      </ul>
    </div>
  );
};

export default UserProfileMenu;
