import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { InputAttrs as attrs } from './InputAttrs.js';
import { SelectAttrs as selAttrs } from './SelectAttrs.js';
import InputField from './InputField.js';
import InputFile from './InputFile.js';
import SelectFieldDocCode from './SelectFieldDocCode.js';
import SubmitButton from './SubmitButton.js';
import ErrorPage from './ErrorPage.js';
import DropZoneFileUpload from './DropZoneFileUpload.js';
import FlashMessage from './FlashMessage.js'
import InfoBanner from './InfoBanner.js'
import SuccessPage from './SuccessPage.js'

function logout(dispatch) {
  dispatch({ type: 'LOGIN', payload: { user: { loggedIn: false } }});
}

const NewDirective = () => {
  const user = useSelector((state) => state.user.username);
  const admin = useSelector((state) => state.user.admin);
  const roles = useSelector((state) => state.roles);
  const permitted = admin || roles.includes('chief');
  const dispatch = useDispatch();
  const [subject, setSubject] = useState('');
  const [note, setNote] = useState('');
  const [file, setFile] = useState(null);
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0});
  const [success, setSuccess] = useState(false);
  const [nextId, setNextId] = useState('Loading');
  const [directiveCodes, setDirectiveCodes] = useState([]);
  const [typeCode, setTypeCode] = useState('');
  const { t } = useTranslation();
  const MAX_FILE_SIZE = 5000000;

  function uploadFile() {
    const url = '/api/directive/upload';
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

  function saveDirective(fileProps) {
    const fileData = fileProps.hasOwnProperty("filename") ? fileProps : null;
    const url = `/api/directive/new`;
    const token = localStorage.getItem('at');
    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({subject, user, typeCode, note, fileData})
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

  const handleAddDirective = async () => {
    let fileProps = {};
    if (file) {
      fileProps = await uploadFile();
    }
    if (fileProps !== 'error') {
      saveDirective(fileProps);
    }
  };

  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const url1 = '/api/get/codes/directive';
    const url2 = `/api/get/directive/nextid`;
    const ws = new WebSocket(`ws://${window.location.hostname}:3080/directive`);
    const token = localStorage.getItem('at');
    ws.addEventListener('message', (e) => { setNextId(e.data); });

    fetch(url1, { headers: { 'Authorization': `Bearer ${token}` }, signal })
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
          setDirectiveCodes(data.docCodes);
          setTypeCode(data.docCodes[0].code);
        }
      })
      .catch((e) => console.error(e))

    fetch(url2, { headers: { 'Authorization': `Bearer ${token}` }, signal })
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
  }, []);

  if (success) {
    return (
      <SuccessPage
        title={t('successPage.title1')}
        linkPath="/directives"
        linkName={t('successPage.link3')}
        className="success-page-grid"
        wrapperClassName="success-page-wrapper success-page-grid__success-page-wrapper"
        logoClassName="success-page__logo"
        titleClassName="success-page__title"
        linkClassName="success-page__link"
      />
    );
  }
  if (!permitted) return <ErrorPage code={403} />;

  return (
    <div className="add-record-grid">
      {infoMsg.str &&
          <FlashMessage msg={infoMsg.str} id={infoMsg.id} type={infoMsg.type} />}
      <InfoBanner
        className="banner-nextid add-record-grid_banner_nextid"
        titleClassName="banner-nextid__title"
        valueClassName="banner-nextid__value"
        title={t('newRecord.infoMsg4')}
        value={nextId + '-' + typeCode}
      />
      <div className="add-record add-record-grid__add-record">
        <InputField
          attrs={attrs['directive'].find(x => x.name === 'directive-subj')}
          setter={setSubject}
          value={subject}
          inputClassName="add-record__input"
          labelClassName="add-record__label"
        />
        <SelectFieldDocCode
          attrs={selAttrs['directive'].find(x => x.name === 'directiveCode')}
          fields={['code', 'title']}
          setter={setTypeCode}
          value={typeCode}
          options={directiveCodes}
          selectClassName="add-record__input"
          labelClassName="add-record__label"
        />
        <InputField
          attrs={attrs['directive'].find(x => x.name === 'directive-note')}
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
          disabled={!subject}
          setter={handleAddDirective}
        />
      </div>
    </div>
  );
};

export default NewDirective;
