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
  const className = props.className;
  const { t } = useTranslation();

  return (
    <div className={className}>
      <table className={`${className}__table`}>
        <TableHead
          table="contacts"
          className={className}
          t={t}
        />
        <ContactsContext.Provider value={setter}>
          {content &&
              <Rows
                rows={content}
                kind='contacts'
                className={className}
              />
          }
        </ContactsContext.Provider>
      </table>
        {noData && <p><i>{noDataMsg}</i></p>}
    </div>
  );
};

export default TableContacts;
