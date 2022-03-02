export const headerColumns = {
  inbox: [
    {
      id: 'id',
      label: '#',
      sortable: false,
    },
    {
      id: 'subj',
      label: 'headerCellBox.label1',
      sortable: false,
    },
    {
      id: 'from',
      label: 'headerCellBox.label2',
      sortable: true,
    },

    {
      id: 'date',
      label: 'headerCellBox.label4',
      sortable: true,
    },

    {
      id: 'user',
      label: 'headerCellBox.label5',
      sortable: false,
    },

    {
      id: 'replyTo',
      label: 'headerCellBox.label6',
      sortable: false,
    },
    {
      id: 'actions',
      label: 'headerCellBox.label7',
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
      label: 'headerCellBox.label1',
      sortable: false,
    },
    {
      id: 'to',
      label: 'headerCellBox.label3',
      sortable: true,
    },

    {
      id: 'date',
      label: 'headerCellBox.label4',
      sortable: true,
    },

    {
      id: 'user',
      label: 'headerCellBox.label5',
      sortable: false,
    },

    {
      id: 'replyTo',
      label: 'headerCellBox.label6',
      sortable: false,
    },
    {
      id: 'action',
      label: 'headerCellBox.label7',
      sortable: false,
    },
  ],
  contacts: [
    {
      id: 'name',
      label: 'headerCellContacts.label1',
      sortable: false,
    },
    {
      id: 'location',
      label: 'headerCellContacts.label2',
      sortable: false,
    },
    {
      id: 'region',
      label: 'headerCellContacts.label3',
      sortable: false
    },
    {
      id: 'actions',
      label: 'headerCellContacts.label4',
      sortable: false
    }
  ]
};
