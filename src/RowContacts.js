import { useState, Fragment, useContext } from 'react';
import { HiPencil, HiCheckCircle, HiXCircle, HiTrash } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { ContactsContext } from './TableContacts.js';

const RowContacts = ({ entry }) => {
  const [editOn, setEditOn] = useState(false);
  const [name, setName] = useState(entry.name);
  const [location, setLocation] = useState(entry.location);
  const [region, setRegion] = useState(entry.region);
  const [deleted, setDeleted] = useState(false);
  const { t } = useTranslation();

  const setter = useContext(ContactsContext);

  const handleEdit = () => { setEditOn(true); };

  const handleDelete = (id) => {
    if (window.confirm(t('editContact.confirm'))) {
      fetch(`/api/contact/delete/${id}`)
        .then(res => {
          if (res.ok) setDeleted(true);
          if (res.status === 500) {
            setter({str: t('editContact.infoMsg2'), id: Math.random()});
          }
        })
        .catch((e) => console.error(e))
    }
  }

  const handleSubmit = (id) => {
    setter('');
    fetch("/api/contact/update", {
      method: 'POST',
      body: JSON.stringify({ id, name, location, region }),
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        if (res.ok) setEditOn(false);
        if (res.status === 500) {
          setter({str: t('editContact.infoMsg1'), id: Math.random()});
        }
      })
      .catch((e) => console.error(e))
  };

  const handleCancel = () => {
    setEditOn(false);
    setName(entry.name);
    setLocation(entry.location);
    setRegion(entry.region);
  };

  return deleted ? null : (
    <Fragment>
      <tr className="page-table__tr">
        <td className="page-table__td">
          {editOn ?
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /> : name}
        </td>
        <td className="page-table__td">
          {editOn ?
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            /> : location}
        </td>
        <td className="page-table__td">
          {editOn ?
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            /> : region}
        </td>
        <td className="page-table__td">{!editOn ?
            <>
              <button
                className="page-table__button"
                onClick={() => handleEdit()}><HiPencil />
              </button>
              <button
                className="page-table__button"
                onClick={() => handleDelete(entry._id)}><HiTrash />
              </button>
            </> :
            <>
              <button
                className="page-table__button"
                onClick={() => handleSubmit(entry._id)}><HiCheckCircle />
              </button>
              <button
                className="page-table__button"
                onClick={() => handleCancel()}><HiXCircle />
              </button>
            </>
          }
        </td>
      </tr>
    </Fragment>
  );
};

export default RowContacts;
