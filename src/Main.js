import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Rows from './Rows.js';
import { head } from './TableHead.js';
import SortIcon from './sortIcon.js';

const Main = (page) => {
  const box = page.location.pathname.slice(1);
  const [tbContent, setTbContent] = useState([]);
  const [column, setColumn] = useState('id');
  const [sortOrder, setSortOrder] = useState('asc');

  const handleClick = (id) => {
    let direction = 'asc';
    if(column === id && sortOrder === 'asc') {
      direction = 'desc';
    }
    setColumn(id);
    setSortOrder(direction);
  }

  useEffect(() => {
    const queryString = `?field=${column}&order=${sortOrder}`;
    fetch(`/api/${box}` + queryString)
     .then(res => res.json())
     .then(setTbContent)
  }, [sortOrder, column])

  return (
    <div className="page-content">
      <div className="page-title">
        <h2>{box.toUpperCase()}</h2>
      </div>
      <div className="page-actions">
        <NavLink to={`/${box}/new`}>New</NavLink>
      </div>
      <div className="page-table">
        <table>
          <thead>
            <tr className="top-row">
              {head[`${box}`].map((item) => {
                const { id = '', label = '', sortable } = item;
                const currentItem = column === id;
                const direction = currentItem ? sortOrder : '';
                return (
                  <th key={id}>
                    {sortable ? (
                      <button type="button" onClick={() => handleClick(id)}>
                        {label} <SortIcon direction={direction} />
                      </button>
                    ) : (
                      label
                    )}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            <Rows rows={tbContent} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Main;
