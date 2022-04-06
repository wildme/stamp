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
        string: en.signup.string,
        infoMsg1: en.signup.infoMsg1,
        infoMsg2: en.signup.infoMsg2,
        infoMsg3: en.signup.infoMsg3,
        infoMsg4: en.signup.infoMsg4,
        infoMsg5: en.signup.infoMsg5
      },
      navbar: {
        inbox: en.navbar.inbox,
        outbox: en.navbar.outbox,
        contacts: en.navbar.contacts,
        profile: en.navbar.profile,
        logout: en.navbar.logout
      },
      contacts: {
        title: en.contacts.title,
        infoMsg1: en.contacts.infoMsg1,
        infoMsg2: en.contacts.infoMsg2,
        link: en.contacts.link
      },
      userProfile: {
        subTitle: en.userProfile.subTitle,
        item1: en.userProfile.item1,
        item2: en.userProfile.item2,
        item3: en.userProfile.item3
      },
      personalInfo: {
        title: en.personalInfo.title,
        label1: en.personalInfo.label1,
        label2: en.personalInfo.label2,
        label3: en.personalInfo.label3,
        infoMsg1: en.personalInfo.infoMsg1,
        infoMsg2: en.personalInfo.infoMsg2,
        button: en.personalInfo.button
      },
      email: {
        title: en.email.title,
        label1: en.email.label1,
        button: en.email.button,
        infoMsg1: en.email.infoMsg1,
        infoMsg2: en.email.infoMsg2,
        infoMsg3: en.email.infoMsg3
      },
      password: {
        title: en.password.title,
        label1: en.password.label1,
        label2: en.password.label2,
        label3: en.password.label3,
        button: en.password.button,
        string: en.password.string,
        infoMsg1: en.password.infoMsg1,
        infoMsg2: en.password.infoMsg2,
        infoMsg3: en.password.infoMsg3,
        infoMsg4: en.password.infoMsg4
      },
      newRecord: {
        label1: en.newRecord.label1,
        label2: en.newRecord.label2,
        label3: en.newRecord.label3,
        label4: en.newRecord.label4,
        label5: en.newRecord.label5,
        label6: en.newRecord.label6,
        button: en.newRecord.button,
        infoMsg1: en.newRecord.infoMsg1,
        infoMsg2: en.newRecord.infoMsg2
      },
      editRecord: {
        link: en.editRecord.link,
        label1: en.editRecord.label1,
        button: en.editRecord.button,
        infoMsg1: en.editRecord.infoMsg1,
        infoMsg2: en.editRecord.infoMsg2,
        infoMsg3: en.editRecord.infoMsg3,
        infoMsg4: en.editRecord.infoMsg4,
        infoMsg5: en.editRecord.infoMsg5
      },
      editContact: {
        infoMsg1: en.editContact.infoMsg1,
        infoMsg2: en.editContact.infoMsg2,
        confirm: en.editContact.confirm
      },
      recordCard: {
        titleinbox: en.recordCard.titleinbox,
        titleoutbox: en.recordCard.titleoutbox,
        subject: en.recordCard.subject,
        from: en.recordCard.from,
        to: en.recordCard.to,
        date: en.recordCard.date,
        updated: en.recordCard.updated, 
        replyTo: en.recordCard.replyTo,
        user: en.recordCard.user,
        status: en.recordCard.status,
        note: en.recordCard.note,
        button1: en.recordCard.button1,
        button2: en.recordCard.button2,
        infoMsg1: en.recordCard.infoMsg1,
        infoMsg2: en.recordCard.infoMsg2,
        infoMsg3: en.recordCard.infoMsg3
      },
      newContact: {
        label1: en.newContact.label1,
        label2: en.newContact.label2,
        label3: en.newContact.label3,
        button: en.newContact.button,
        infoMsg: en.newContact.infoMsg
      },
      main: {
        titleInbox: en.main.titleInbox,
        titleOutbox: en.main.titleOutbox,
        link: en.main.link,
        infoMsg1: en.main.infoMsg1,
        infoMsg2: en.main.infoMsg2
      },
      headerCellBox: {
        label1: en.headerCellBox.label1,
        label2: en.headerCellBox.label2,
        label3: en.headerCellBox.label3,
        label4: en.headerCellBox.label4,
        label5: en.headerCellBox.label5,
        label6: en.headerCellBox.label6,
        label7: en.headerCellBox.label7
      },
      headerCellContacts: {
        label1: en.headerCellContacts.label1,
        label2: en.headerCellContacts.label2,
        label3: en.headerCellContacts.label3,
        label4: en.headerCellContacts.label4
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
        string: ru.signup.string,
        infoMsg1: ru.signup.infoMsg1,
        infoMsg2: ru.signup.infoMsg2,
        infoMsg3: ru.signup.infoMsg3,
        infoMsg4: ru.signup.infoMsg4,
        infoMsg5: ru.signup.infoMsg5
      },
      navbar: {
        inbox: ru.navbar.inbox,
        outbox: ru.navbar.outbox,
        contacts: ru.navbar.contacts,
        profile: ru.navbar.profile,
        logout: ru.navbar.logout
      },
      contacts: {
        title: ru.contacts.title,
        infoMsg1: ru.contacts.infoMsg1,
        infoMsg2: ru.contacts.infoMsg2,
        link: ru.contacts.link
      },
      userProfile: {
        subTitle: ru.userProfile.subTitle,
        item1: ru.userProfile.item1,
        item2: ru.userProfile.item2,
        item3: ru.userProfile.item3
      },
      personalInfo: {
        title: ru.personalInfo.title,
        label1: ru.personalInfo.label1,
        label2: ru.personalInfo.label2,
        label3: ru.personalInfo.label3,
        infoMsg1: ru.personalInfo.infoMsg1,
        infoMsg2: ru.personalInfo.infoMsg2,
        button: ru.personalInfo.button
      },
      email: {
        title: ru.email.title,
        label1: ru.email.label1,
        button: ru.email.button,
        infoMsg1: ru.email.infoMsg1,
        infoMsg2: ru.email.infoMsg2,
        infoMsg3: ru.email.infoMsg3
      },
      password: {
        title: ru.password.title,
        label1: ru.password.label1,
        label2: ru.password.label2,
        label3: ru.password.label3,
        button: ru.password.button,
        string: ru.password.string,
        infoMsg1: ru.password.infoMsg1,
        infoMsg2: ru.password.infoMsg2,
        infoMsg3: ru.password.infoMsg3,
        infoMsg4: ru.password.infoMsg4
      },
      newRecord: {
        label1: ru.newRecord.label1,
        label2: ru.newRecord.label2,
        label3: ru.newRecord.label3,
        label4: ru.newRecord.label4,
        label5: ru.newRecord.label5,
        label6: ru.newRecord.label6,
        button: ru.newRecord.button,
        infoMsg1: ru.newRecord.infoMsg1,
        infoMsg2: ru.newRecord.infoMsg2
      },
      editRecord: {
        link: ru.editRecord.link,
        label1: ru.editRecord.label1,
        button: ru.editRecord.button,
        infoMsg1: ru.editRecord.infoMsg1,
        infoMsg2: ru.editRecord.infoMsg2,
        infoMsg3: ru.editRecord.infoMsg3,
        infoMsg4: ru.editRecord.infoMsg4,
        infoMsg5: ru.editRecord.infoMsg5
      },
      editContact: {
        infoMsg1: ru.editContact.infoMsg1,
        infoMsg2: ru.editContact.infoMsg2,
        confirm: ru.editContact.confirm
      },
      recordCard: {
        titleinbox: ru.recordCard.titleinbox,
        titleoutbox: ru.recordCard.titleoutbox,
        subject: ru.recordCard.subject,
        from: ru.recordCard.from,
        to: ru.recordCard.to,
        date: ru.recordCard.date,
        updated: ru.recordCard.updated, 
        replyTo: ru.recordCard.replyTo,
        user: ru.recordCard.user,
        status: ru.recordCard.status,
        note: ru.recordCard.note,
        button1: ru.recordCard.button1,
        button2: ru.recordCard.button2,
        infoMsg1: ru.recordCard.infoMsg1,
        infoMsg2: ru.recordCard.infoMsg2,
        infoMsg3: ru.recordCard.infoMsg3
      },
      newContact: {
        "label1": ru.newContact.label1,
        "label2": ru.newContact.label2,
        "label3": ru.newContact.label3,
        "button": ru.newContact.button,
        "infoMsg": ru.newContact.infoMsg
      },
      main: {
        titleInbox: ru.main.titleInbox,
        titleOutbox: ru.main.titleOutbox,
        link: ru.main.link,
        infoMsg1: ru.main.infoMsg1,
        infoMsg2: ru.main.infoMsg2
      },
      headerCellBox: {
        label1: ru.headerCellBox.label1,
        label2: ru.headerCellBox.label2,
        label3: ru.headerCellBox.label3,
        label4: ru.headerCellBox.label4,
        label5: ru.headerCellBox.label5,
        label6: ru.headerCellBox.label6,
        label7: ru.headerCellBox.label7
      },
      headerCellContacts: {
        label1: ru.headerCellContacts.label1,
        label2: ru.headerCellContacts.label2,
        label3: ru.headerCellContacts.label3,
        label4: ru.headerCellContacts.label4
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en-En',
    interpolation: { escapeValue: false }
  });

(async () => {
  await fetch("/api/get/language")
    .then(res => res.json())
    .then(data => i18n.changeLanguage(data))
    .catch((e) => console.error(e))
})();

export default i18n;
