import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import Logo from './Logo.js'

const HeaderLinks = () => {
  const { t } = useTranslation();

  return (
    <div className="navbar">
      <div className="navbar-logo">
        <Link to="/"><Logo /></Link>
      </div>
      <div className="navbar-left">
        <NavLink to="/inbox">{t('navbar.inbox')}</NavLink>
        <NavLink to="/outbox">{t('navbar.outbox')}</NavLink>
        <NavLink to="/contacts">{t('navbar.contacts')}</NavLink>
      </div>
      <div className="navbar-right">
        <NavLink to="/my-profile">{t('navbar.profile')}</NavLink>
        <Link to="/logout">{t('navbar.logout')}</Link>
      </div>
    </div>
  );
};

const HeaderBlank = () => {
  return (
    <div className="navbar">
      <div className="navbar-logo"></div>
      <div className="navbar-left"></div>
      <div className="navbar-right"></div>
    </div>
  );
};

export const Header = () => {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  return loggedIn ? <HeaderLinks /> : <HeaderBlank />;
};
