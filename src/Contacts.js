import { useState, useEffect, createContext } from 'react';
import { Link } from 'react-router-dom';
import TableHead from './TableHead.js';
import Rows from './Rows.js';
import FlashMessage from './FlashMessage.js'

export const ContactsContext = createContext();

const AllContacts = () => {
  const [tbContacts, setTbContacts] = useState([]);
  const [infoMsg, setInfoMsg] = useState('');
  const [noData, setNoData] = useState(false);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    fetch("/api/contacts", { signal })
      .then(res => {
        if (res.status === 200) return res.json();
        if (res.status === 500) setInfoMsg("Couldn't get contacts");
        if (res.status === 204) setNoData(true);
      })
      .then(data => setTbContacts(data))
      .catch((e) => console.error(e));

    return () => { abortController.abort(); };
  }, [])

  return (
  <div className="page-content">
    <div className="page-title">
      <h2>CONTACTS</h2>
    </div>
    { infoMsg &&
      <div className="flash-msg-grid-container">
        <FlashMessage msg={infoMsg} />
      </div>
    }
    <div className="page-actions">
      <Link to="/contacts/new">New</Link>
    </div>
    <div className="page-table">
      <table>
        <thead>
          <tr className="top-row">
            <TableHead table="contacts" />
          </tr>
        </thead>
        <tbody>
            <ContactsContext.Provider value='contacts'>
    { tbContacts && <Rows rows={tbContacts} />}
            </ContactsContext.Provider>
       </tbody>
      </table>
    { noData && <p><i>No contacts</i></p> }
    </div>
  </div>
  )
};

export default AllContacts;
