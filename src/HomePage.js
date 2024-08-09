import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ActionCard from './ActionCard.js';

const HomePage = () => {
  const fullname = useSelector((state) => state.info.fullname);
  const admin = useSelector((state) => state.user.admin);
  const roles = useSelector((state) => state.roles);
  const [firstname] = fullname.split(' ');
  const { t } = useTranslation();

  return (
    <div className="home-page-grid">
      <div className="home-page-title">
        <h1 className="home-page-title__h1">
          {t('homepage.string1')}, {firstname}!
        </h1>
      </div>
      <div className="home-page-actions-grid">
        <ActionCard
          path="/inbox/new"
          title={t('homepage.action1')}
          className="action-open-page"
          linkClassName="action-open-page__link"
          iconClassName="action-open-page__icon"
        />
        <ActionCard
          path="/outbox/new"
          title={t('homepage.action2')}
          className="action-open-page"
          linkClassName="action-open-page__link"
          iconClassName="action-open-page__icon"
        />
        {admin || roles.includes('chief') ?
        <ActionCard
          path="/directive/new"
          title={t('homepage.action4')}
          className="action-open-page"
          linkClassName="action-open-page__link"
          iconClassName="action-open-page__icon"
        />
            : null}
        <ActionCard
          path="/contacts/new"
          title={t('homepage.action3')}
          className="action-open-page"
          linkClassName="action-open-page__link"
          iconClassName="action-open-page__icon"
        /> 
      </div>
    </div>
  );
};

export default HomePage;
