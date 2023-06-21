import RowContacts from './RowContacts.js';
import TableHead from './TableHead.js';
import ContactsTableColumnLabels  from './ContactsTableColumnLabels.js';

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
        {content && (
          <tbody>
            {content.map((row, index) => {
              return (<RowContacts
                        entry={row}
                        key={index}
                        className={className}
                        setter={setter}
                     />);
            })}
          </tbody>)
        }
      </table>
        {noData && <p><i>{noDataMsg}</i></p>}
    </div>
  );
};

export default TableContacts;
