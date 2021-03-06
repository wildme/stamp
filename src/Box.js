import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import ReactPaginate from 'react-paginate';
import TableBox from './TableBox.js';
import FlashMessage from './FlashMessage.js';

const Box = (props) => {
  const box = props.location.pathname.slice(1);
  const state = useSelector((state) => state.settings.records.sortOrder);
  const [tableData, setTableData] = useState(null);
  const [noData, setNoData] = useState(false);
  const [column, setColumn] = useState('date');
  const [sortOrder, setSortOrder] = useState(state || 'asc');
  const [error, setError] = useState(false);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const [dataForPage, setDataForPage] = useState(null);
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage] = useState(null);
  const { t } = useTranslation();
  const recordsPerPage = 20;

  const handlePageClick = (event) => {
    const newOffset = (event.selected * recordsPerPage) % tableData.length;
    setPage(event.selected);
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

    fetch(`/api/${box}?field=${column}&order=${sortOrder}`, {signal})
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 204) {
          setNoData(true);
        }
        if (res.status === 500) {
          setError(true);
          setInfoMsg({str: t('main.infoMsg1'), id: Math.random()});
        }
       })
      .then(data => {
        setTableData(data);
        setPage(0);
        setDataForPage(data.slice(recordOffset, recordOffset + recordsPerPage));
        setPageCount(Math.ceil(data.length / recordsPerPage));
      })
      .catch((e) => console.error(e))

    return () => { abortController.abort(); };

  }, [sortOrder, column, box, t])
  
  return (
    <div className="page-content-grid">
      {infoMsg.str && <FlashMessage msg={infoMsg.str} id={infoMsg.id} />}
      <div className="page-title">
        <h2 className="page-title__h2">
          {box === 'inbox' ? t('main.titleInbox') : t('main.titleOutbox')}
        </h2>
      </div>
      <TableBox
        table={box}
        sortOrder={sortOrder}
        column={column}
        setter={handleClick}
        content={dataForPage}
        noData={noData}
        t={t}
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
