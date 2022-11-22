import { createContext } from 'react';
import { useTranslation } from 'react-i18next';
import TableHead from './TableHead.js';
import Rows from './Rows.js';

export const ContactsContext = createContext();

const TableContacts = (props) => {
  const content = props.content;
  const noData = props.noData;
  const noDataMsg = props.noDataMsg;
  const setter = props.setInfoMsg;
  const { t } = useTranslation();

  return (
    <div className="page-table">
      <table className="page-table__table">
        <TableHead table="contacts" t={t} />
          <ContactsContext.Provider value={setter}>
            {content && <Rows rows={content} kind='contacts' />}
          </ContactsContext.Provider>
      </table>
        {noData && <p><i>{noDataMsg}</i></p>}
    </div>
  )
};

export default TableContacts;
