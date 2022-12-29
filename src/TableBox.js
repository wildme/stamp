import { createContext } from 'react';
import TableHead from './TableHead.js';
import Rows from './Rows.js';
import TableTabs from './TableTabs.js';

export const BoxContext = createContext();

const TableBox = (props) => {
  const content = props.content;
  const noData = props.noData;
  const noDataMsg = props.noDataMsg;
  const table = props.table;
  const sortOrder = props.sortOrder;
  const column = props.column;
  const setter = props.setter;
  const className = props.className;

  return (
    <div className={className}>
      <TableTabs className={`${className}-tabs`} />
      <table className={`${className}__table`}>
        <TableHead
          className={className}
          table={table}
          handleClick={setter}
          sortOrder={sortOrder}
          column={column}
          noData={noData}
        />
        <BoxContext.Provider value={table}>
          {content &&
              <Rows
                rows={content}
                kind='box'
                className={className}
              />
          }
        </BoxContext.Provider>
      </table>
        {noData && <p><i>{noDataMsg}</i></p>}
    </div>
  );
};

export default TableBox;
