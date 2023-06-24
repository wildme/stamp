import i18next from './i18n/i18n.js';

export const stampMenu = {
  userProfile: [
    {
      to: '/my-profile',
      name: i18next.t('userProfile.item1')
    },
    {
      to: '/my-profile/e-mail',
      name: i18next.t('userProfile.item2')
    },
    {
      to: '/my-profile/password',
      name: i18next.t('userProfile.item3')
    },
    {
      to: '/my-profile/settings',
      name: i18next.t('userProfile.item4')
    }
  ]
};
