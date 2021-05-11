import { useState } from 'react';

const useTableSort = (data = []) => {
    const [sortColumn, setSortColumn] = useState("");
    const [sortDirection, setSortDirection] = useState("");
    const [tableData, setTableData] = useState(data);

    const handleSort = (column) => {
        let direction = 'asc';
        if (sortColumn === column && sortDirection === 'asc') {
            direction = 'desc';
        }
        setSortColumn(column);
        setSortDirection(direction);
    };

    return { handleSort, sortColumn, sortDirection };
}

export default useTableSort;
