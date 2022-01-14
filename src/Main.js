import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import TableHead from './TableHead.js';
import Rows from './Rows.js';

const Main = (props) => {
  const box = props.location.pathname.slice(1);
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
              <TableHead table={box} handleClick={handleClick} sortOrder={sortOrder} column={column} />
            </tr>
          </thead>
          <tbody>
            <Rows rows={tbContent} table="box"/>
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default Main;
