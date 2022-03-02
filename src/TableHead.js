import { headerColumns } from './headerColumns.js';
import SortIcon from './sortIcon.js';

const TableHead = ({ table, handleClick, sortOrder, column, t }) =>
    headerColumns[`${table}`].map((item) => {
    const { id = '', label = '', sortable } = item;
    const currentItem = column === id;
    const direction = currentItem ? sortOrder : '';

    return (
      <th key={id}>{ sortable ? 
        <button type="button" onClick={ () => handleClick(id) }>
          { t(label) } <SortIcon direction={ direction } />
        </button> : t(label) }
      </th>
    )
   }) 

export default TableHead;
