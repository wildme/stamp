import { useTranslation } from 'react-i18next';

const DirTableColumnLabels = () => {
  const { t } = useTranslation();
  return {
    directives: [
      {
        id: 'id',
        label: '#',
        sortable: false
      },
      {
        id: 'subj',
        label: t('headerCellDir.label1'),
        sortable: false
      },
      {
        id: 'createdAt',
        label: t('headerCellDir.label2'),
        sortable: true
      },
      {
        id: 'file',
        label: t('headerCellDir.label3'),
        sortable: false
      },
      {
        id: 'actions',
        label: t('headerCellDir.label4'),
        sortable: false
      }
    ]
  }
};

export default DirTableColumnLabels;
