import { useState } from 'react';

const useTableSort = (data = []) => {
  const [sortColumn, setSortColumn] = useState('');
  const [sortDirection, setSortDirection] = useState('');
  const [tableData, setTableData] = useState(data);

  const sortNumber = (numbers = [], column) =>
    numbers.sort((a, b) => a[column] - b[column]);

  const sortString = (strings = [], column) =>
    strings.sort((a, b) => {
      const stringA = a[column].toUpperCase();
      const stringB = b[column].toUpperCase();
      if (stringA < stringB) {
        return -1;
      }
      if (stringA > stringB) {
        return 1;
      }
      return 0;
    });

  const sortData = (column, direction) => {
    const dataType = typeof tableData[0][column];
    let sortResult = [];
    let reverseResult = [];
    if (dataType === 'string') {
      sortResult = sortString(tableData, column);
      reverseResult = direction === 'desc' ? sortResult.reverse() : sortResult;
      setTableData(reverseResult);
    }
    if (dataType === 'number') {
      sortResult = sortNumber(tableData, column);
      reverseResult = direction === 'desc' ? sortResult.reverse() : sortResult;
      setTableData(reverseResult);
    } else {
      return tableData;
    }
  };

  const handleSort = (column) => {
    let direction = 'asc';
    if (sortColumn === column && sortDirection === 'asc') {
      direction = 'desc';
    }
    setSortColumn(column);
    setSortDirection(direction);
    return sortData(column, direction);
  };

  return { handleSort, sortColumn, sortDirection, tableData };
};

export default useTableSort;
