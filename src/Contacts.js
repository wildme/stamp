import { useState, useEffect, createContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TableHead from './TableHead.js';
import Rows from './Rows.js';
import FlashMessage from './FlashMessage.js'

export const ContactsContext = createContext();

const Contacts = () => {
  const [tbContacts, setTbContacts] = useState([]);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const [noData, setNoData] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch("/api/contacts", {signal})
      .then(res => {
        if (res.status === 200) return res.json();
        if (res.status === 500) {
          setInfoMsg({str: t('contacts.infoMsg1'), id: Math.random()});
        }
        if (res.status === 204) setNoData(true);
      })
      .then(data => setTbContacts(data))
      .catch((e) => console.error(e));

    return () => { abortController.abort(); };
  }, [t])

  return (
    <div className="page-content-grid">
      <div className="page-title">
        <h2>{t('contacts.title')}</h2>
      </div>
      {infoMsg.str && <FlashMessage msg={infoMsg.str} id={infoMsg.id} />}
      <div className="page-actions">
        <Link
          className="page-actions__link"
          to="/contacts/new">
          {t('contacts.link')}
        </Link>
      </div>
      <div className="page-table">
        <table className="page-table__table">
          <TableHead table="contacts" t={t}/>
            <ContactsContext.Provider value={setInfoMsg}>
              {tbContacts && <Rows rows={tbContacts} kind='contacts' />}
            </ContactsContext.Provider>
        </table>
        {noData && <p><i>{t('contacts.infoMsg2')}</i></p>}
      </div>
    </div>
  )
};

export default Contacts;
