import TableHead from './TableHead.js';
import RowDirectives from './RowDirectives.js';
import DirTableColumnLabels from './DirTableColumnLabels.js';

const TableDirectives = (props) => {
  const content = props.content;
  const noData = props.noData;
  const noDataMsg = props.noDataMsg;
  const sortOrder = props.sortOrder;
  const column = props.column;
  const setter = props.setter;
  const className = props.className;
  const labels = DirTableColumnLabels();

  return (
    <div className={className}>
      <table className={`${className}__table`}>
        <TableHead
          labels={labels['directives']}
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
                return (<RowDirectives
                          entry={row}
                          key={index}
                          className={className}
                       />);
              })}
            </tbody>)
          }
      </table>
        {noData && <p><i>{noDataMsg}</i></p>}
    </div>
  );
};

export default TableDirectives;
