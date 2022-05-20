import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ErrorPage = (props) => {
  const { t } = useTranslation();
  const code = props.code || 404;

  return (
    <div className="error-page-grid">
      <div className="error-page__top-title">
        {code === 404 && <h2>{t('errorPage.title1')}</h2>}
        {code === 401 && <h2>{t('errorPage.title2')}</h2>}
      </div>
      <div className="error-page__mid-title">
        <h1>{code}</h1>
      </div>
      <div className="error-page__bottom-title">
        {code === 404 && <h2>{t('errorPage.title3')}</h2>}
        {code === 401 && <h2>{t('errorPage.title4')}</h2>}
      </div>
      <div className="error-page__home-link">
        <Link to={"/"}>{t('errorPage.link1')}</Link>
      </div>
    </div>
  );
};
export default ErrorPage;
