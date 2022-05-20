import { createContext } from 'react';
import TableHead from './TableHead.js';
import Rows from './Rows.js';

export const BoxContext = createContext();

const TableBox = (props) => {
  const content = props.content;
  const noData = props.noData;
  const table = props.table;
  const sortOrder = props.sortOrder;
  const column = props.column;
  const setter = props.setter;
  const t = props.t;

  return (
    <div className="page-table">
      <table className="page-table__table">
        <TableHead
          table={table}
          handleClick={setter}
          sortOrder={sortOrder}
          column={column}
          t={t}
        />
        <BoxContext.Provider value={table}>
          {content && <Rows rows={content} kind='box' />}
        </BoxContext.Provider>
      </table>
        {noData && <p><i>{t('main.infoMsg2')}</i></p>}
    </div>
  )
};

export default TableBox;
