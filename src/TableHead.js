import { useTranslation } from 'react-i18next';
import { headerColumns } from './headerColumns.js';
import SortIcon from './sortIcon.js';

const TableHead = (props) => {
  const table = props.table;
  const handleClick = props.handleClick;
  const sortOrder = props.sortOrder;
  const column = props.column;
  const noData = props.noData;
  const { t } = useTranslation();

  return (
    <thead className="page-table__thead">
      <tr className="page-table__tr">
        {headerColumns[`${table}`].map((item) => {
          const { id = '', label = '', sortable } = item;
          const currentItem = column === id;
          const direction = currentItem ? sortOrder : '';

          return (
            <th key={id}>{sortable ?
              <button
                className="page-table__button"
                disabled={noData}
                type="button"
                onClick={() => handleClick(id)}
              >
                {t(label)} <SortIcon direction={direction} />
              </button> : t(label)}
            </th>
          )
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
