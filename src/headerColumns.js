export const headerColumns = {
  inbox: [
    {
      id: 'id',
      label: '#',
      sortable: false,
    },
    {
      id: 'subj',
      label: 'Subject',
      sortable: false,
    },
    {
      id: 'from',
      label: 'From',
      sortable: true,
    },

    {
      id: 'date',
      label: 'Date',
      sortable: true,
    },

    {
      id: 'user',
      label: 'User',
      sortable: false,
    },

    {
      id: 'replyTo',
      label: 'Reply to',
      sortable: false,
    },
    {
      id: 'select',
      label: 'Select',
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
      label: 'Subject',
      sortable: false,
    },
    {
      id: 'to',
      label: 'To',
      sortable: true,
    },

    {
      id: 'date',
      label: 'Date',
      sortable: true,
    },

    {
      id: 'user',
      label: 'User',
      sortable: false,
    },

    {
      id: 'replyTo',
      label: 'Reply to',
      sortable: false,
    },
    {
      id: 'select',
      label: 'Select',
      sortable: false,
    },
  ],
  contacts: [
    {
      id: 'name',
      label: 'Name',
      sortable: false,
    },
    {
      id: 'location',
      label: 'Location',
      sortable: false,
    },
    {
      id: 'region',
      label: 'Region',
      sortable: false
    }
  ]
};
