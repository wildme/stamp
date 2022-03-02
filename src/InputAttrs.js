export const InputAttrs = {
  inbox: [
    {
      for: 'subj',
      text: 'newRecord.label1',
      name: 'subj',
      type: 'text'
    },

    {
      for: 'from',
      text: 'newRecord.label2',
      name: 'from',
      type: 'text'
    },

    {
      for: 'note',
      text: 'newRecord.label5',
      name: 'note',
      type: 'text'
    },
    {
      for: 'replyTo',
      text: 'newRecord.label4',
      name: 'replyTo',
      type: 'text'
    }
  ],
  outbox: [
    {
      for: 'subj',
      text: 'newRecord.label1',
      name: 'subj',
      type: 'text'
    },

    {
      for: 'to',
      text: 'newRecord.label3',
      name: 'to',
      type: 'text'
    },

    {
      for: 'note',
      text: 'newRecord.label5',
      name: 'note',
      type: 'text'
    },
    {
      for: 'replyTo',
      text: 'newRecord.label4',
      name: 'replyTo',
      type: 'text'
    }
  ],
  contact: [
    {
      for: 'name',
      text: 'newContact.label1',
      name: 'name',
      type: 'text'
    },
    {
      for: 'location',
      text: 'newContact.label2',
      name: 'location',
      type: 'text'
    },
    {
      for: 'region',
      text: 'newContact.label3',
      name: 'region',
      type: 'text'
    }
  ]
};
