import { useState, useEffect, createContext } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import TableHead from './TableHead.js';
import Rows from './Rows.js';
import FlashMessage from './FlashMessage.js'

export const ContactsContext = createContext();

const Contacts = () => {
  const [tbContacts, setTbContacts] = useState([]);
  const [infoMsg, setInfoMsg] = useState('');
  const [noData, setNoData] = useState(false);
  const { t } = useTranslation();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;

    fetch("/api/contacts", { signal })
      .then(res => {
        if (res.status === 200) return res.json();
        if (res.status === 500) setInfoMsg(t('contacts.infoMsg1'));
        if (res.status === 204) setNoData(true);
      })
      .then(data => setTbContacts(data))
      .catch((e) => console.error(e));

    return () => { abortController.abort(); };
  }, [t])

  return (
    <div className="page-content">
      <div className="page-title">
        <h2>{ t('contacts.title') }</h2>
      </div>
      { infoMsg &&
        <div className="flash-msg-grid-container">
          <FlashMessage msg={infoMsg} />
        </div>
      }
      <div className="page-actions">
        <Link to="/contacts/new">{ t('contacts.link') }</Link>
      </div>
      <div className="page-table">
        <table>
          <thead>
            <tr className="top-row">
              <TableHead table="contacts" t={t}/>
            </tr>
          </thead>
          <tbody>
              <ContactsContext.Provider value={setInfoMsg}>
          { tbContacts &&
              <Rows rows={tbContacts} kind='contacts' />
          }
              </ContactsContext.Provider>
         </tbody>
        </table>
      { noData &&
          <p><i>{ t('contacts.infoMsg2') }</i></p>
      }
      </div>
    </div>
  )
};

export default Contacts;
