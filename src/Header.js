import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const HeaderLinks = () => {
  const { t } = useTranslation();

  return (
    <div className="navbar">
      <div className="navbar-left">
        <Link to="/" id="logo">Stamp</Link>
        <Link to="/inbox">{t('navbar.inbox')}</Link>
        <Link to="/outbox">{t('navbar.outbox')}</Link>
        <Link to="/contacts">{t('navbar.contacts')}</Link>
      </div>
      <div className="navbar-right">
        <Link to="/my-profile">{t('navbar.profile')}</Link>
        <Link to="/logout">{t('navbar.logout')}</Link>
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
  const loggedIn = useSelector((state) => state.user.loggedIn);
  return loggedIn ? <HeaderLinks /> : <HeaderBlank />;
};
