import { useTranslation } from 'react-i18next';

const BoxTableColumnLabels = () => {
  const { t } = useTranslation();
  return {
    inbox: [
      {
        id: 'id',
        label: '#',
        sortable: false,
      },
      {
        id: 'subj',
        label: t('headerCellBox.label1'),
        sortable: false,
      },
      {
        id: 'addr',
        label: t('headerCellBox.label2'),
        sortable: true,
      },
      {
        id: 'date',
        label: t('headerCellBox.label4'),
        sortable: true,
      },
      {
        id: 'file',
        label: t('headerCellBox.label5'),
        sortable: false,
      },
      {
        id: 'replyTo',
        label: t('headerCellBox.label6'),
        sortable: false,
      },
      {
        id: 'actions',
        label: t('headerCellBox.label7'),
        sortable: false,
      },
    ],
    outbox: [
      {
        id: 'id',
        label: '#',
        sortable: false,
      },
      {
        id: 'subj',
        label: t('headerCellBox.label1'),
        sortable: false,
      },
      {
        id: 'addr',
        label: t('headerCellBox.label3'),
        sortable: true,
      },
      {
        id: 'date',
        label: t('headerCellBox.label4'),
        sortable: true,
      },
      {
        id: 'file',
        label: t('headerCellBox.label5'),
        sortable: false,
      },
      {
        id: 'replyTo',
        label: t('headerCellBox.label6'),
        sortable: false,
      },
      {
        id: 'action',
        label: t('headerCellBox.label7'),
        sortable: false,
      }
    ]
  }
};
export default BoxTableColumnLabels 
