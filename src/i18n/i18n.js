import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import ru from './ru.json';
import en from './en.json';

const resources = {
  en: {
    translation: {
      login: {
        placeholder1: en.login.placeholder1,
        placeholder2: en.login.placeholder2,
        button: en.login.button,
        string: en.login.string,
        link: en.login.link
      }
    }
  },
  ru: {
    translation: {
      login: {
        placeholder1: ru.login.placeholder1,
        placeholder2: ru.login.placeholder2,
        button: ru.login.button,
        string: ru.login.string,
        link: ru.login.link
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
