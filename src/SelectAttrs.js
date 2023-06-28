import i18n from './i18n/i18n.js';

export const SelectAttrs = {
  UserProfile: [
    {
      for: 'sortOrder',
      text: i18n.t('userSettings.label1'),
      name: 'sortOrder',
      options: [
        { asc: i18n.t('userSettings.optSort1') },
        { desc: i18n.t('userSettings.optSort2') }
      ]
    }
  ]
};
