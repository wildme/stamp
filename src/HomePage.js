import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';

const Hello = () => {
  const fullname = useSelector((state) => state.info.fullname);
  const [firstname] = fullname.split(' ');
  const { t } = useTranslation();

  return <h1>{t('homepage.string1')}, {firstname}!</h1>
}

export default Hello;
