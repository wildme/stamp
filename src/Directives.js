import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import TableDirectives from './TableDirectives.js';
import YearButtons from './YearButtons.js';
import FlashMessage from './FlashMessage.js';
import SimpleHeading2 from './SimpleHeading2.js';

const Directives = () => {
  const sorting = useSelector((state) => state.settings.sortOrder);
  const dispatch = useDispatch();
  const thisYear = new Date().getFullYear();
  const recordsPerPage = 30;
  const [column, setColumn] = useState('createdAt');
  const [tableData, setTableData] = useState([]);
  const [noData, setNoData] = useState(false);
  const [error, setError] = useState(false);
  const [sortOrder, setSortOrder] = useState(sorting || 'asc');
  const [year, setYear] = useState(thisYear);
  const [yearsOfActivity, setYearsOfActivity] = useState([]);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const [dataForPage, setDataForPage] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [page, setPage] = useState(0);
  const { t } = useTranslation();

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
    const token = localStorage.getItem('at');
    const abortController = new AbortController();
    const signal = abortController.signal;
    const recordOffset = 0;
    const url = `/api/get/directives?column=${column}&order=${sortOrder}&year=${year}`;

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
          localStorage.setItem('at', data.token);
        }
        if (!data.records && data.years) {
          setNoData(true);
          setDataForPage(null);
          setPageCount(0);
          setYearsOfActivity(data.years);
        }
        if (data.records) {
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

  }, [sortOrder, year, column, t, dispatch])
  
  return (
    <div className="page-content-grid">
      {infoMsg.str && <FlashMessage msg={infoMsg.str} id={infoMsg.id} />}
      <SimpleHeading2
        containerClassName="page-title"
        h2ClassName="page-title__h2"
        text={t('main.titleDirectives')}
      />
      <YearButtons
        containerClassName="filter-by-year filter-by-year__page-title"
        buttonClassName="filter-by-year__button"
        activeButtonClassName="filter-by-year__button_active"
        years={yearsOfActivity}
        setter={setYear}
      />
      <TableDirectives
        className="box-table"
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

export default Directives;
