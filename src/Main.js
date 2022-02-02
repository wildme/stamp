import { useState, useEffect, createContext } from 'react';
import { NavLink } from 'react-router-dom';
import TableHead from './TableHead.js';
import Rows from './Rows.js';

export const BoxContext = createContext();

const Main = (props) => {
  const box = props.location.pathname.slice(1);
  const [tbContent, setTbContent] = useState([]);
  const [column, setColumn] = useState('date');
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
    const abortController = new AbortController();
    const { signal } = abortController;

    (async () => {
      await fetch(`/api/${box}?field=${column}&order=${sortOrder}`, { signal })
        .then(res => res.json())
        .then(setTbContent)
        .catch((e) => console.error(e))
    })();

    return () => { abortController.abort(); };

  }, [sortOrder, column, box])

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
            <tr>
              <TableHead table={box} handleClick={handleClick} sortOrder={sortOrder} column={column} />
            </tr>
          </thead>
          <tbody>
            <BoxContext.Provider value={box}>
              <Rows rows={tbContent}/>
            </BoxContext.Provider>
          </tbody>
        </table>
      </div>
    </div>
  )
};

export default Main;
