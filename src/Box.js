import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TableBox from './TableBox.js';
import FlashMessage from './FlashMessage.js';

const Box = (props) => {
  const box = props.location.pathname.slice(1);
  const [tableData, setTableData] = useState(null);
  const [noData, setNoData] = useState(false);
  const [column, setColumn] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(false);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const { t } = useTranslation();

  const handleClick = (id) => {
    let direction = 'asc';
    if (column === id && sortOrder === 'asc') {
      direction = 'desc';
    }
    if (!error) {
      setColumn(id);
      setSortOrder(direction);
    }
  }

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

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
      .then(data => setTableData(data))
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
      <div className="page-actions">
        <Link
          className="page-actions__link"
          to={`/${box}/new`}>
          {t('main.link')}
        </Link>
      </div>
      <TableBox
        table={box}
        sortOrder={sortOrder}
        column={column}
        setter={handleClick}
        content={tableData}
        noData={noData}
        t={t}
      />
    </div>
  )
};

export default Box;
