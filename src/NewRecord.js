import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputAttrs as attrs } from './InputAttrs.js';
import { stampI18n } from './stampI18n.js';
import InputField from './InputField.js';
import InputSearchField from './InputSearchField.js'
import InputFile from './InputFile.js';
import SubmitButton from './SubmitButton.js';
import DropZoneFileUpload from './DropZoneFileUpload.js';
import FlashMessage from './FlashMessage.js'
import InfoBanner from './InfoBanner.js'
import SuccessPage from './SuccessPage.js'

function logout(dispatch) {
  dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
}

const NewRecord = () => {
  const { box } = useParams();
  const replyToBox = (box === 'inbox') ? 'outbox' : 'inbox';
  const replyToPrefix = stampI18n[replyToBox].map(x => x.prefix);
  const user = useSelector((state) => state.user.username);
  const MAX_FILE_SIZE = 5000000;
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const [subject, setSubject] = useState('');
  const [fromTo, setFromTo] = useState('');
  const [note, setNote] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [file, setFile] = useState(null);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const [nextId, setNextId] = useState('Loading...');
  const [success, setSuccess] = useState(false);

  function uploadFile() {
    const url = `/api/${box}/upload`;
    const formData = new FormData();
    const token = localStorage.getItem('at');
    formData.append('file', file);

    return fetch(url, {
      method: 'POST',
      headers: {'Authorization': `Bearer ${token}`},
      body: formData
    })
      .then(res => {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          logout(dispatch);
          return 1;
        }
        if (res.status === 500) {
          setInfoMsg({str: t('newRecord.infoMsg2'), id: Math.random()});
          return 1;
        }
      })
      .then(data => {
        if (data.token) {
          localStorage.setItem('at', data.token);
        }
        if (data === 1) {
          return 'error';
        }
        return data.file;
      })
      .catch((e) => console.error(e));
  }

  function saveRecord(fileProps) {
    const fileData = fileProps.hasOwnProperty("filename") ? fileProps : null;
    const url = `/api/${box}/new`;
    const token = localStorage.getItem('at');
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({subject, fromTo, user, replyTo, note, fileData})
    })
      .then(res => {
        if (res.status === 200) {
          setSuccess(true);
          return res.json();
        }
        if (res.status === 401) {
          logout(dispatch);
          return 1;
        }
        if (res.status === 500) {
          setInfoMsg({str: t('newRecord.infoMsg1'), id: Math.random()});
          return 1;
        }
      })
      .then(data => {
        if (data.token) {
          localStorage.setItem('at', data.token);
        }
      })
      .catch((e) => console.error(e))
  }

  const handleAddRecord = async () => {
    let fileProps = {};
    if (file) {
      fileProps = await uploadFile();
    }
    if (fileProps !== 'error') {
      saveRecord(fileProps);
    }
  };


  useEffect(() => {
    const token = localStorage.getItem('at');
    const abortController = new AbortController();
    const signal = abortController.signal;
    const url = `/api/${box}/nextid`;
    const ws = new WebSocket(`ws://${window.location.hostname}:3080/${box}`);
    ws.addEventListener('message', (e) => { setNextId(e.data); });

    fetch(url, { headers: { 'Authorization': `Bearer ${token}` }, signal })
      .then(res =>  {
        if (res.status === 200) {
          return res.json();
        }
        if (res.status === 401) {
          dispatch({type: 'LOGIN', payload: { user: { loggedIn: false } }});
          return 1;
        }
      })
      .then(data => {
        if (data.token) {
          localStorage.setItem('at', data.token);
        }
        if (data !== 1) {
          setNextId(data.nextid)
        }
      })
      .catch((e) => console.error(e))

    return () => {abortController.abort(); ws.close();};
  }, [box, dispatch]);

  if (success) {
    return (
      <SuccessPage
        title={t('successPage.title1')}
        linkPath="/letters"
        linkName={t('successPage.link1')}
        className="success-page-grid"
        wrapperClassName="success-page-wrapper success-page-grid__success-page-wrapper"
        logoClassName="success-page__logo"
        titleClassName="success-page__title"
        linkClassName="success-page__link"
      />
    );
  }

  return (
    <div className="add-record-grid">
      {infoMsg.str &&
          <FlashMessage msg={infoMsg.str} id={infoMsg.id} type={infoMsg.type} />}
      <InfoBanner
        className="banner-nextid add-record-grid_banner_nextid"
        titleClassName="banner-nextid__title"
        valueClassName="banner-nextid__value"
        title={t('newRecord.infoMsg4')}
        value={nextId}
      />
      <div className="add-record add-record-grid__add-record">
        <InputField
          attrs={attrs[box].find(x => x.name === `${box}-subj`)}
          setter={setSubject}
          value={subject}
          inputClassName="add-record__input"
          labelClassName="add-record__label"
        />
        <InputField
          attrs={attrs[box].find(x => x.name === `${box}-addr`)}
          setter={setFromTo}
          value={fromTo}
          inputClassName="add-record__input"
          labelClassName="add-record__label"
        />
        <InputSearchField
          setter={setReplyTo}
          attrs={attrs[box].find(x => x.name === `${box}-replyTo`)}
          url={`/api/${replyToBox}/search-by-id`}
          prefix={replyToPrefix}
          inputClassName="add-record__input"
          labelClassName="add-record__label"
          listClassName="search-input-list"
          itemClassName="search-input-list__item"
          activeItemClassName="search-input-list__item_active"
          noMatchesClassName="search-input-no-matches"
          noMatchesMsg={t('newRecord.string1')}
        />
        <InputField
          attrs={attrs[box].find(x => x.name === `${box}-note`)}
          setter={setNote}
          value={note}
          inputClassName="add-record__input"
          labelClassName="add-record__label"
        />
        <InputFile
          label={t('newRecord.label6')}
          name={"file"}
          inputClassName="add-record__upload"
          labelClassName="add-record__label"
          setter={setFile}
          setInfoMsg={setInfoMsg}
          maxFileSize={MAX_FILE_SIZE}
          maxFileSizeExceededMsg={t('editRecord.infoMsg5')}
        />
        <DropZoneFileUpload
          setter={setFile}
          className="drop-zone-file"
          title={t('dropZoneFile.title1')}
          maxFileSize={MAX_FILE_SIZE}
          maxFileSizeExceededMsg={t('dropZoneFile.infoMsg1')}
        />
        <SubmitButton
          name={t('newRecord.button')}
          className={"add-record__submit"}
          disabled={!subject || !fromTo}
          setter={handleAddRecord}
        />
      </div>
    </div>
  );
};

export default NewRecord;
