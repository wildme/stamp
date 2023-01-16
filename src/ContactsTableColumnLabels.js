import { useTranslation } from 'react-i18next';

const ContactsTableColumnLabels = () => {
  const { t } = useTranslation();
  return {
    contacts: [
      {
        id: 'name',
        label: t('headerCellContacts.label1'),
        sortable: false,
      },
      {
        id: 'location',
        label: t('headerCellContacts.label2'),
        sortable: false,
      },
      {
        id: 'region',
        label: t('headerCellContacts.label3'),
        sortable: false
      },
      {
        id: 'actions',
        label: t('headerCellContacts.label4'),
        sortable: false
      }
    ]
  }
};
export default ContactsTableColumnLabels 
