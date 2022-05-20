import { createContext } from 'react';
import TableHead from './TableHead.js';
import Rows from './Rows.js';

export const ContactsContext = createContext();

const TableContacts = (props) => {
  const content = props.content;
  const noData = props.noData;
  const t = props.t;
  const setter = props.setInfoMsg;

  return (
    <div className="page-table">
      <table className="page-table__table">
        <TableHead table="contacts" t={t} />
          <ContactsContext.Provider value={setter}>
            {content && <Rows rows={content} kind='contacts' />}
          </ContactsContext.Provider>
      </table>
        {noData && <p><i>{t('contacts.infoMsg2')}</i></p>}
    </div>
  )
};

export default TableContacts;
