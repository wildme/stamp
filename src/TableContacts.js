import { createContext } from 'react';
import TableHead from './TableHead.js';
import ContactsTableColumnLabels  from './ContactsTableColumnLabels.js';
import Rows from './Rows.js';

export const ContactsContext = createContext();

const TableContacts = (props) => {
  const content = props.content;
  const noData = props.noData;
  const noDataMsg = props.noDataMsg;
  const setter = props.setInfoMsg;
  const className = props.className;
  const labels = ContactsTableColumnLabels();

  return (
    <div className={className}>
      <table className={`${className}__table`}>
        <TableHead
          labels={labels["contacts"]}
          trClassName={`${className}__tr`}
          thClassName={`${className}__th`}
        />
        <ContactsContext.Provider value={setter}>
          {content &&
              <Rows
                rows={content}
                kind="contacts"
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
