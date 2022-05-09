import { useState, useEffect, createContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TableHead from './TableHead.js';
import Rows from './Rows.js';
import FlashMessage from './FlashMessage.js'

export const BoxContext = createContext();

const Main = (props) => {
  const box = props.location.pathname.slice(1);
  const [tbContent, setTbContent] = useState([]);
  const [column, setColumn] = useState('date');
  const [sortOrder, setSortOrder] = useState('asc');
  const [error, setError] = useState(false);
  const [infoMsg, setInfoMsg] = useState('');
  const [noData, setNoData] = useState(false);
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

    fetch(`/api/${box}?field=${column}&order=${sortOrder}`, { signal })
      .then(res => {
        if (res.status === 200) return res.json();
        if (res.status === 204) setNoData(true);
        if (res.status === 500) {
          setError(true);
          setInfoMsg(t('main.infoMsg1'));
        }
       })
      .then(setTbContent)
      .catch((e) => console.error(e))

    return () => { abortController.abort(); };

  }, [sortOrder, column, box, t])

  return (
    <div className="page-content">
      {infoMsg && <FlashMessage msg={infoMsg} />}
      <div className="page-title">
        <h2>
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
      <div className="page-table">
        <table className="page-table__table">
          <thead className="page-table__thead">
            <tr className="page-table__tr">
              <TableHead table={box} handleClick={handleClick}
                sortOrder={sortOrder} column={column} t={t}
              />
            </tr>
          </thead>
          <tbody>
            <BoxContext.Provider value={box}>
              { tbContent && <Rows rows={tbContent} kind='box' /> }
            </BoxContext.Provider>
          </tbody>
        </table>
        { noData && <p><i>{t('main.infoMsg2')}</i></p> }
      </div>
    </div>
  )
};

export default Main;
