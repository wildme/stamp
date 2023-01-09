import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import TableContacts from './TableContacts.js';
import FlashMessage from './FlashMessage.js';
import SimpleHeading2 from './SimpleHeading2.js';

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
          return 1;
        }
        if (res.status === 204) {
          setNoData(true);
          return 1;
        }
        if (res.status === 500) {
          setInfoMsg({str: t('contacts.infoMsg1'), id: Math.random()});
          return 1;
        }
      })
      .then(data => {
        if (data.token) {
          dispatch({type: 'TOKEN', payload: { token: { string: data.token } }});
        }
        if (data !== 1) {
          setTableData(data.contacts);
        }
      })
      .catch((e) => console.error(e))

    return () => { abortController.abort(); };
  }, [t, dispatch, token])

  return (
    <div className="page-content-grid">
      <SimpleHeading2
        containerClassName="page-title"
        h2ClassName="page-title__h2"
        text={t('contacts.title')}
      />
        {infoMsg.str && <FlashMessage msg={infoMsg.str} id={infoMsg.id} />}
      <TableContacts
        className="contacts-table"
        content={tableData}
        noData={noData}
        noDataMsg={t('contacts.infoMsg2')}
        setInfoMsg={setInfoMsg}
      />
    </div>
  );
};

export default Contacts;
