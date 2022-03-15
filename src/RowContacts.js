import { useState, Fragment, useContext } from 'react';
import { HiPencil, HiCheckCircle, HiXCircle, HiTrash } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { ContactsContext } from './Contacts.js';

const RowContacts = ({ entry }) => {
  const [editOn, setEditOn] = useState(false);
  const [name, setName] = useState(entry.name);
  const [location, setLocation] = useState(entry.location);
  const [region, setRegion] = useState(entry.region);
  const [hidden, setHidden] = useState(false);
  const { t } = useTranslation();

  const setter = useContext(ContactsContext);

  const handleEdit = () => { setEditOn(true); };

  const handleDelete = (id) => {
    if (window.confirm(t('editContact.confirm'))) {
      fetch(`/api/contact/delete/${id}`)
        .then(res => {
          if (res.ok) setHidden(true);
          if (res.status === 500) {
            setter(t('editContact.infoMsg2'));
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
          setter(t('editContact.infoMsg1'));
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

  return (
    <Fragment>
      <tr className="contact-item" hidden={hidden}>
        <td>{ editOn ? <input type="text" value={name}
          onChange={(e) => setName(e.target.value)} /> : name }
        </td>
        <td>{ editOn ? <input type="text" value={location}
          onChange={(e) => setLocation(e.target.value)}/> : location }
        </td>
        <td>{ editOn ? <input type="text" value={region}
          onChange={(e) => setRegion(e.target.value)}/> : region}
        </td>
        <td>{ !editOn ?
            <>
              <button onClick={() => handleEdit()}><HiPencil /></button>
              <button onClick={() => handleDelete(entry._id)}><HiTrash /></button>
            </> :
            <>
              <button
                onClick={() => handleSubmit(entry._id)}><HiCheckCircle />
              </button>
              <button onClick={() => handleCancel()}><HiXCircle /></button>
            </>
          }
        </td>
      </tr>
    </Fragment>
  )
};

export default RowContacts;
