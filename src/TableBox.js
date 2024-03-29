import TableHead from './TableHead.js';
import RowBox from './RowBox.js';
import BoxTableColumnLabels  from './BoxTableColumnLabels.js';

const TableBox = (props) => {
  const content = props.content;
  const noData = props.noData;
  const noDataMsg = props.noDataMsg;
  const table = props.table;
  const sortOrder = props.sortOrder;
  const column = props.column;
  const setter = props.setter;
  const className = props.className;
  const labels = BoxTableColumnLabels();

  return (
    <div className={className}>
      <table className={`${className}__table`}>
        <TableHead
          labels={labels[table]}
          trClassName={`${className}__tr`}
          thClassName={`${className}__th`}
          sortButtonClassName={`${className}__button`}
          handleClick={setter}
          sortOrder={sortOrder}
          column={column}
          noData={noData}
        />
          {content && (
            <tbody>
              {content.map((row, index) => {
                return (<RowBox
                          entry={row}
                          key={index}
                          className={className}
                          box={table}
                       />);
              })}
            </tbody>)
          }
      </table>
        {noData && <p><i>{noDataMsg}</i></p>}
    </div>
  );
};

export default TableBox;
