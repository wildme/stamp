import SortIcon from './sortIcon.js';

const TableHead = (props) => {
  const trClassName = props.trClassName;
  const thClassName = props.thClassName;
  const sortButtonClassName = props.sortButtonClassName;
  const handleClick = props.handleClick;
  const sortOrder = props.sortOrder;
  const column = props.column;
  const noData = props.noData;
  const labels = props.labels;

  return (
    <thead>
      <tr className={trClassName}>
        {labels.map((item) => {
          const currentItem = column === item.id;
          const direction = currentItem ? sortOrder : '';

          return (
            <th key={item.id} className={thClassName}>{item.sortable ?
              <button
                className={sortButtonClassName}
                disabled={noData}
                type="button"
                onClick={() => handleClick(item.id)}>
                {item.label} <SortIcon direction={direction} />
              </button> : item.label}
            </th>
          );
        })}
      </tr>
    </thead>
  );
};

export default TableHead;
