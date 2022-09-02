import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TableContacts from './TableContacts.js';
import FlashMessage from './FlashMessage.js';

const Contacts = () => {
  const [tableData, setTableData] = useState(null);
  const [noData, setNoData] = useState(false);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const token = useSelector((state) => state.token.string);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const url = "/api/contacts";

    fetch(url, { headers: { 'Authorization': `Bearer ${token}` }, signal })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          dispatch({type: 'LOGIN', payload: { user: { loggedIn: false } }});
        }
        if (res.status === 204) {
          setNoData(true);
        }
        if (res.status === 500) {
          setInfoMsg({str: t('contacts.infoMsg1'), id: Math.random()});
        }
      })
      .then(data => {
        if (data.token) {
          dispatch({type: 'TOKEN', payload: { token: { string: data.token } }});
        }
        setTableData(data.contacts)
      })
      .catch((e) => console.error(e))

    return () => { abortController.abort(); };
  }, [t, dispatch, token])

  return (
    <div className="page-content-grid">
      <div className="page-title">
        <h2 className="page-title__h2">{t('contacts.title')}</h2>
      </div>
        {infoMsg.str && <FlashMessage msg={infoMsg.str} id={infoMsg.id} />}
      <TableContacts
        content={tableData}
        noData={noData}
        setInfoMsg={setInfoMsg}
        t={t}
      />
    </div>
  );
};

export default Contacts;
