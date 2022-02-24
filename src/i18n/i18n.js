import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru.json';

const resources = {
  en: {
    translation: {

    }
  },
  ru: {
    translation: {

    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: "en",
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
