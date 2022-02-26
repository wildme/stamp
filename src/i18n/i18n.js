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
        link: en.login.link,
        infoMsg1: en.login.infoMsg1,
        infoMsg2: en.login.infoMsg2
      },
      signup: {
        placeholder1: en.signup.placeholder1,
        placeholder2: en.signup.placeholder2,
        placeholder3: en.signup.placeholder3,
        placeholder4: en.signup.placeholder4,
        placeholder5: en.signup.placeholder5,
        placeholder6: en.signup.placeholder6,
        button: en.signup.button,
        infoMsg1: en.signup.infoMsg1,
        infoMsg2: en.signup.infoMsg2,
        infoMsg3: en.signup.infoMsg3,
        infoMsg4: en.signup.infoMsg4,
        infoMsg5: en.signup.infoMsg5
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
        link: ru.login.link,
        infoMsg1: ru.login.infoMsg1,
        infoMsg2: ru.login.infoMsg2,
      },
      signup: {
        placeholder1: ru.signup.placeholder1,
        placeholder2: ru.signup.placeholder2,
        placeholder3: ru.signup.placeholder3,
        placeholder4: ru.signup.placeholder4,
        placeholder5: ru.signup.placeholder5,
        placeholder6: ru.signup.placeholder6,
        button: ru.signup.button,
        infoMsg1: ru.signup.infoMsg1,
        infoMsg2: ru.signup.infoMsg2,
        infoMsg3: ru.signup.infoMsg3,
        infoMsg4: ru.signup.infoMsg4,
        infoMsg5: ru.signup.infoMsg5
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    interpolation: { escapeValue: false }
  });

(async () => {
  await fetch("/api/get/language")
    .then(res => res.json())
    .then(data => i18n.changeLanguage(data))
    .catch((e) => console.error(e))
})();

export default i18n;
