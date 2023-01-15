import { useTranslation } from 'react-i18next';
import { headerColumns } from './headerColumns.js';
import SortIcon from './sortIcon.js';

const TableHead = (props) => {
  const trClassName = props.trClassName;
  const thClassName = props.thClassName;
  const sortButtonClassName = props.sortButtonClassName;
  const table = props.table;
  const handleClick = props.handleClick;
  const sortOrder = props.sortOrder;
  const column = props.column;
  const noData = props.noData;
  const { t } = useTranslation();

  return (
    <thead>
      <tr className={trClassName}>
        {headerColumns[table].map((item) => {
          const currentItem = column === item.id;
          const direction = currentItem ? sortOrder : '';

          return (
            <th key={item.id} className={thClassName}>{item.sortable ?
              <button
                className={sortButtonClassName}
                disabled={noData}
                type="button"
                onClick={() => handleClick(item.id)}>
                {t(item.label)} <SortIcon direction={direction} />
              </button> : t(item.label)}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
