import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import TableHead from './TableHead.js';
import Rows from './Rows.js';

const AllContacts = () => {
  const [tbContacts, setTbContacts] = useState([]);
  const [infoMsg, setInfoMsg] = useState('');

  useEffect(() => {
    fetch("/api/contacts")
    .then(res => {
      if (res.status === 200) return res.json();
      if (res.status === 204) setInfoMsg('No contacts');
    })
    .then(data => setTbContacts(data))
    .catch(err => console.log(err));
  }, [])

  return (
  <div className="page-content">
    <div className="page-title">
      <h2>CONTACTS</h2>
    </div>
    <div className="page-actions">
      <NavLink to="/contacts/new">New</NavLink>
    </div>
    <div className="page-table">
      <table>
        <thead>
          <tr className="top-row">
            <TableHead table="contacts" />
          </tr>
        </thead>
        <tbody>
    { tbContacts && <Rows table="contacts" rows={tbContacts} />}
       </tbody>
      </table>
    { infoMsg && <p>{infoMsg}</p> }
    </div>
  </div>
  )
};

export default AllContacts;
