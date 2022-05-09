import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Logo from './Logo.js'

const HeaderLinks = () => {
  const { t } = useTranslation();

  return (
    <div className="navbar navbar_black">
      <div className="navbar_logo">
        <Link to="/"><Logo /></Link>
      </div>
      <div className="navbar_left">
        <NavLink className="menu__item" to="/inbox">
          {t('navbar.inbox')}
        </NavLink>
        <NavLink className="menu__item" to="/outbox">
          {t('navbar.outbox')}
        </NavLink>
        <NavLink className="menu__item" to="/contacts">
          {t('navbar.contacts')}
        </NavLink>
      </div>
      <div className="navbar_right">
        <NavLink className="menu__item" to="/my-profile">
          {t('navbar.profile')}
        </NavLink>
        <Link className="menu__item" to="/logout">{t('navbar.logout')}</Link>
      </div>
    </div>
  );
};

const HeaderBlank = () => {
  return (
    <div className="navbar navbar_black">
      <div className="navbar_logo"></div>
      <div className="navbar_left"></div>
      <div className="navbar_right"></div>
    </div>
  );
};

export const Header = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  return loggedIn ? <HeaderLinks /> : <HeaderBlank />;
};
