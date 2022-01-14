import { headerColumns } from './headerColumns.js';
import SortIcon from './sortIcon.js';

const TableHead = ({ table, handleClick, sortOrder, column }) => 
    headerColumns[`${table}`].map((item) => {
    const { id = '', label = '', sortable } = item;
    const currentItem = column === id;
    const direction = currentItem ? sortOrder : '';

    return (
      <th key={id}>{ sortable ? 
        <button type="button" onClick={ () => handleClick(id) }>
          { label } <SortIcon direction={ direction } /></button> : label }
      </th>
    )
   }) 

export default TableHead;
