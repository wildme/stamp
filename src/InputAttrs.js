export const InputAttrs = {
  inbox: [
    {
      for: 'subj',
      text: 'Subject',
      name: 'subj',
      type: 'text',
    },

    {
      for: 'from',
      text: 'From',
      name: 'from',
      type: 'text',
    },

    {
      for: 'note',
      text: 'Note',
      name: 'note',
      type: 'text',
    },
  ],
  outbox: [
    {
      for: 'subj',
      text: 'Subject',
      name: 'subj',
      type: 'text',
    },

    {
      for: 'to',
      text: 'To',
      name: 'to',
      type: 'text',
    },

    {
      for: 'note',
      text: 'Note',
      name: 'note',
      type: 'text',
    },
  ],
  contact: [
    {
      for: 'location',
      text: 'Location',
      name: 'location',
      type: 'text',
    },

    {
      for: 'name',
      text: 'Name',
      name: 'name',
      type: 'text',
    },
    {
      for: 'region',
      text: 'Region',
      name: 'region',
      type: 'text'
    }
  ]
};
