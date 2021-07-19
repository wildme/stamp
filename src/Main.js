import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { useLocation } from 'react-router-dom';
import Rows from './Rows.js';
import { head } from './TableHead.js';
import useTableSort from './useTableSort.js';
import SortIcon from './sortIcon.js';

const Main = ({ inbox, outbox }) => {
  const { pathname } = useLocation();
  const box = /(in|out)box/.exec(pathname)[0];
  const currentTable = box === 'inbox' ? inbox : outbox;
  const { handleSort, sortColumn, sortDirection, tableData } =
    useTableSort(currentTable);
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
                const currentItem = sortColumn === id;
                const direction = currentItem ? sortDirection : '';
                return (
                  <th key={id}>
                    {sortable ? (
                      <button type="button" onClick={() => handleSort(id)}>
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
            <Rows rows={tableData} />
          </tbody>
        </table>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  const { inbox, outbox } = state;
  return { inbox, outbox };
};

export default connect(mapStateToProps)(Main);
