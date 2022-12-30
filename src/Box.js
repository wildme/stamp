import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import TableBox from './TableBox.js';
import TableTabs from './TableTabs.js';
import FlashMessage from './FlashMessage.js';

const Box = (props) => {
  const state = useSelector((state) => state.settings.records.sortOrder);
  const token = useSelector((state) => state.token.string);
  const dispatch = useDispatch();
  const [box, setBox] = useState('outbox');
  const [tableData, setTableData] = useState(null);
  const [noData, setNoData] = useState(false);
  const [column, setColumn] = useState('date');
  const [sortOrder, setSortOrder] = useState(state || 'asc');
  const [year, setYear] = useState(new Date().getFullYear());
  const [yearsOfActivity, setYearsOfActivity] = useState([]);
  const [error, setError] = useState(false);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const [dataForPage, setDataForPage] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(null);
  const { t } = useTranslation();
  const recordsPerPage = 20;

  const handlePageClick = (e) => {
    const newOffset = (e.selected * recordsPerPage) % tableData.length;
    setPage(e.selected);
    setDataForPage(tableData.slice(newOffset, newOffset + recordsPerPage));
  };

  const handleClick = (id) => {
    let direction = 'asc';
    if (column === id && sortOrder === 'asc') {
      direction = 'desc';
    }
    if (!error) {
      setColumn(id);
      setSortOrder(direction);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const recordOffset = 0;
    const url = `/api/${box}?column=${column}&order=${sortOrder}&year=${year}`;

    fetch(url, { headers: { 'Authorization': `Bearer ${token}` }, signal })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          dispatch({type: 'LOGIN', payload: { user: { loggedIn: false } }});
          return 1;
        }
        if (res.status === 204) {
          setNoData(true);
          setDataForPage(null);
          setPageCount(0);
          return 1;
        }
        if (res.status === 500) {
          setError(true);
          setInfoMsg({str: t('main.infoMsg1'), id: Math.random()});
          return 1;
        }
       })
      .then(data => {
        if (data.token) {
          dispatch({type: 'TOKEN', payload: { token: { string: data.token } }});
        }
        if (data !== 1) {
          setNoData(false);
          setTableData(data.records);
          setYearsOfActivity(data.years);
          setPage(0);
          setDataForPage(data.records.slice(recordOffset, recordOffset + recordsPerPage));
          setPageCount(Math.ceil(data.records.length / recordsPerPage));
        }
      })
      .catch((e) => console.error(e))

    return () => { abortController.abort(); };

  }, [sortOrder, year, column, box, t, token, dispatch])
  
  return (
    <div className="page-content-grid">
      {infoMsg.str && <FlashMessage msg={infoMsg.str} id={infoMsg.id} />}
      <div className="page-title">
        <h2 className="page-title__h2">
          {box === 'inbox' ? t('main.titleInbox') : t('main.titleOutbox')}
        </h2>
      </div>
      <div className="page-filter">
        <select
          className="page-filter__select-by-year"
          name="select-by-year"
          value={year}
          onChange={(e) => setYear(e.target.value)}
        >
        {yearsOfActivity.map((item, i) => (
          <option value={item} key={i}>{item}</option>
        ))
        }
        </select>
      </div>
      <TableTabs
        tabs={['inbox', 'outbox']}
        tabTitles={[t('main.tabInbox'), t('main.tabOutbox')]}
        selectedTab="outbox"
        className="box-table-tabs"
        setter={setBox}
      />
      <TableBox
        className="box-table"
        table={box}
        sortOrder={sortOrder}
        column={column}
        setter={handleClick}
        content={dataForPage}
        noData={noData}
        noDataMsg={t('main.infoMsg2')}
      />
      <ReactPaginate
        breakLabel="..."
        nextLabel=">"
        previousLabel="<"
        forcePage={page}
        onPageChange={handlePageClick}
        pageCount={pageCount}
        renderOnZeroPageCount={null}
        pageRangeDisplayed={8}
        containerClassName="pagination-grid"
        pageClassName="pagination-page"
        pageLinkClassName="pagination-page__link"
        nextClassName="pagination-prev-next"
        previousClassName="pagination-prev-next"
        nextLinkClassName="pagination-prev-next__link"
        previousLinkClassName="pagination-prev-next__link"
        disabledClassName="pagination-prev-next_disabled"
        disabledLinkClassName="pagination-prev-next__link_disabled"
        activeClassName="pagination-page_active"
      />
    </div>
  );
};

export default Box;
