import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

const ErrorPage = (props) => {
  const { t } = useTranslation();
  const code = props.code;

  return (
    <div className="error-page-grid-container">
      <div className="error-page-reason-title">
        {code === 404 && <h2>{t('errorPage.title1')}</h2>}
        {code === 401 && <h2>{t('errorPage.title2')}</h2>}
      </div>
      <div className="error-page-code-title">
        <h1>{code}</h1>
      </div>
      <div className="error-page-description">
        {code === 404 && <h2>{t('errorPage.title3')}</h2>}
        {code === 401 && <h2>{t('errorPage.title4')}</h2>}
      </div>
      <div className="error-page-home-link">
        <Link to={"/"}>{t('errorPage.link1')}</Link>
      </div>
    </div>
  )
};
export default ErrorPage;
