import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TableContacts from './TableContacts.js';
import FlashMessage from './FlashMessage.js';

const Contacts = () => {
  const [tableData, setTableData] = useState(null);
  const [noData, setNoData] = useState(false);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const { t } = useTranslation();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch("/api/contacts", {signal})
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 204) {
          setNoData(true);
        }
        if (res.status === 500) {
          setInfoMsg({str: t('contacts.infoMsg1'), id: Math.random()});
        }
      })
      .then(data => setTableData(data))
      .catch((e) => console.error(e))

    return () => { abortController.abort(); };
  }, [t])

  return (
    <div className="page-content-grid">
      <div className="page-title">
        <h2 className="page-title__h2">{t('contacts.title')}</h2>
      </div>
        {infoMsg.str && <FlashMessage msg={infoMsg.str} id={infoMsg.id} />}
      <div className="page-actions">
        <Link
          className="page-actions__link"
          to="/contacts/new">
          {t('contacts.link')}
        </Link>
      </div>
      <TableContacts
        content={tableData}
        noData={noData}
        setInfoMsg={setInfoMsg}
        t={t}
      />
    </div>
  )
};

export default Contacts;
