import { useState, Fragment, useContext } from 'react';
import { useDispatch } from 'react-redux';
import { HiPencil, HiCheckCircle, HiXCircle, HiTrash } from 'react-icons/hi';
import { useTranslation } from 'react-i18next';
import { ContactsContext } from './TableContacts.js';

function logout(dispatch) {
  dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
}

const RowContacts = ({ entry, className }) => {
  const dispatch = useDispatch();
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
      const url = `/api/contact/delete/${id}`;
      const token = localStorage.getItem('at');
      fetch(url, {
        method: 'DELETE',
        headers: {'Authorization': `Bearer ${token}`}
      })
        .then(res => {
          if (res.status === 200) {
            setDeleted(true);
            if (res.token) {
              localStorage.setItem('at', res.token);
            }
          }
          if (res.status === 401) {
            logout(dispatch);
          }
          if (res.status === 500) {
            setter({str: t('editContact.infoMsg2'), id: Math.random()});
          }
        })
        .catch((e) => console.error(e))
    }
  }

  const handleSubmit = (id) => {
    const url = `/api/contact/update/${id}`;
    const token = localStorage.getItem('at');
    setter('');
    fetch(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({name, location, region})
    })
      .then(res => {
        if (res.ok) {
          setEditOn(false);
          if (res.token) {
            localStorage.setItem('at', res.token);
          }
        }
        if (res.status === 401) {
            logout(dispatch);
        }
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
      <tr className={`${className}__tr`}>
        <td className={`${className}__td`}>
          {editOn ?
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            /> : name}
        </td>
        <td className={`${className}__td`}>
          {editOn ?
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            /> : location}
        </td>
        <td className={`${className}__td`}>
          {editOn ?
            <input
              type="text"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            /> : region}
        </td>
        <td className={`${className}__td`}>{!editOn ?
            <>
              <button
                className={`${className}__button`}
                onClick={() => handleEdit()}><HiPencil />
              </button>
              <button
                className={`${className}__button`}
                onClick={() => handleDelete(entry._id)}><HiTrash />
              </button>
            </> :
            <>
              <button
                className={`${className}__button`}
                onClick={() => handleSubmit(entry._id)}><HiCheckCircle />
              </button>
              <button
                className={`${className}__button`}
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
