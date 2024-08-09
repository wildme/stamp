import i18next from './i18n/i18n.js';

export const InputAttrs = {
  directive: [
    {
      for: 'directive-subj',
      text: i18next.t('newRecord.label1') + '*',
      name: 'directive-subj',
      type: 'text'
    },
    {
      for: 'directive-note',
      text: i18next.t('newRecord.label5'),
      name: 'directive-note',
      type: 'text'
    },
  ],
  inbox: [
    {
      for: 'inbox-subj',
      text: i18next.t('newRecord.label1') + '*',
      name: 'inbox-subj',
      type: 'text'
    },
    {
      for: 'inbox-addr',
      text: i18next.t('newRecord.label2') + '*',
      name: 'inbox-addr',
      type: 'text'
    },
    {
      for: 'inbox-note',
      text: i18next.t('newRecord.label5'),
      name: 'inbox-note',
      type: 'text'
    },
    {
      for: 'inbox-replyTo',
      text: i18next.t('newRecord.label4'),
      name: 'inbox-replyTo',
      type: 'text'
    }
  ],
  outbox: [
    {
      for: 'outbox-subj',
      text: i18next.t('newRecord.label1') + '*',
      name: 'outbox-subj',
      type: 'text'
    },
    {
      for: 'outbox-addr',
      text: i18next.t('newRecord.label3') + '*',
      name: 'outbox-addr',
      type: 'text'
    },
    {
      for: 'outbox-note',
      text: i18next.t('newRecord.label5'),
      name: 'outbox-note',
      type: 'text'
    },
    {
      for: 'outbox-replyTo',
      text: i18next.t('newRecord.label4'),
      name: 'outbox-replyTo',
      type: 'text'
    }
  ],
  contact: [
    {
      for: 'name',
      text: i18next.t('newContact.label1'),
      name: 'name',
      type: 'text'
    },
    {
      for: 'location',
      text: i18next.t('newContact.label2'),
      name: 'location',
      type: 'text'
    },
    {
      for: 'region',
      text: i18next.t('newContact.label3'),
      name: 'region',
      type: 'text'
    }
  ],
  userProfile: [
    {
      for: 'firstname',
      text: i18next.t('personalInfo.label1'),
      name: 'firstname',
      type: 'text'
    },
    {
      for: 'lastname',
      text: i18next.t('personalInfo.label2'),
      name: 'lastname',
      type: 'text'
    },
    {
      for: 'email',
      text: i18next.t('email.label1'),
      name: 'email',
      type: 'email'
    },
    {
      for: 'old-pass',
      text: i18next.t('password.label1'),
      name: 'old-pass',
      type: 'password'
    }
  ]
};
