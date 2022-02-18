import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { InputAttrs as attrs } from './InputAttrs.js';
import InputField from './InputFields.js';
import PageNotFound from './404.js';

const EditRecord = () => {
  const { id, box } = useParams();
  const [subject, setSubject] = useState('');
  const [fromTo, setFromTo] = useState('');
  const [note, setNote] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [delFile, setDelFile] = useState(false);
  const [file, setFile] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const [noData, setNoData] = useState(false);
  const [error, setError] = useState(false);
  const [infoMsg, setInfoMsg] = useState('');
  const history = useHistory();

  const handleNewFile = (e) => {
    setNewFile(e.target.files[0]);
  };

  const handleEditRecord = () => {
    fetch(`/api/${box}/update/${id}`, {
      method: 'POST',
      body: JSON.stringify({ subject, fromTo, replyTo, note }),
      headers: { 'Content-Type': 'application/json' }
      })
      .then(res => {
        if (res.status === 500) {
          setError(true);
          setInfoMsg("Couldn't update record");
        }
      })
      .catch((e) => console.error(e))

    if (delFile || (newFile && file)) {
      const fileId = file._id;
      fetch(`/api/attachment/delete/${fileId}`)
        .then(res => {
          if (res.status === 500) {
            setError(true);
            setInfoMsg("Couldn't delete file");
          }
        })
        .catch((e) => console.error(e))
    }

    if (newFile) {
      const formData = new FormData();
      formData.append('file', newFile);
      fetch(`/api/${box}/upload/${id}`, {
       method: 'POST',
       body: formData,
       })
       .then(res => {
         if (res.status === 500) {
           setError(true);
           setInfoMsg("Couldn't upload file");
         }
       })
       .catch((e) => console.error(e))
    }

    if (!error) {
      setSubject('');
      setFromTo('');
      setNote('');
      setReplyTo('');
      history.replace(`/${box}`);
    }
  };

  const handleDownload = () => {
    fetch(`/api/download/${file._id}`)
      .then(res => res.blob())
      .then(blob => {
        const objectURL = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = objectURL;
        a.download=file.filename;
        a.click();
        URL.revokeObjectURL(a.href);
      })
      .catch((e) => console.error(e))
  };

  const handleCheck = () => {
    setDelFile(!delFile);
  }

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    fetch(`/api/${box}/${id}`, { signal: signal })
      .then(res =>  {
        if (res.status === 200) return res.json();
        if (res.status === 204) setNoData(true);
      })
      .then(data => data.map((item) => {
        return (
        setSubject(item.subject),
        setFromTo(item.from || item.to),
        setNote(item.note),
        setReplyTo(item.replyTo)
        )}
      ))
        .catch((e) => console.error(e))

    fetch(`/api/attachment/${box}/${id}`, { signal })
      .then(res => {
        if (res.status === 200) return res.json();
        if (res.status === 204) setFile(null);
        if (!res.ok) throw new Error('Network issue occured');
    })
      .then(data => setFile(data))
      .catch((e) => console.error(e))

    return () => { abortController.abort(); };
  }, [box, id]);

    return noData ? <PageNotFound /> : (
      <div className="edit-grid-container">
        <div className="edit-container">
          <div className="edit-input-container">
            <InputField
              attrs={attrs[`${box}`].filter((x) => x.name === 'subj')[0]}
              setter={setSubject}
              value={subject}
            />
            <InputField
              attrs={
                attrs[`${box}`].filter((x) => x.name === 'from' ||
                  x.name === 'to')[0]
              }
              setter={setFromTo}
              value={fromTo}
              auto={true}
              field='name'
            />
            <InputField
              attrs={attrs[`${box}`].filter((x) => x.name === 'replyTo')[0]}
              setter={setReplyTo}
              value={replyTo}
            />
            <InputField
              attrs={attrs[`${box}`].filter((x) => x.name === 'note')[0]}
              setter={setNote}
              value={note}
            />
          </div>
          <div className="edit-file-container">
            <div>  
              <input type="file" id="upload" onChange={(e) => handleNewFile(e)} />
            </div>
            { file && <div>
              <a href={`/attachment/${file._id}`}
              onClick={() => handleDownload()}>Download
              </a>
              <input type="checkbox" name="del-file" id="del"
              onChange={() => handleCheck()} />
              <label htmlFor="del-file">Delete file</label>
            </div> }
          </div>
          <div className="update-btn-container">
            <button type="submit" onClick={() => handleEditRecord()}>
            Update</button>
          </div>
        </div>
      </div>
  );
};

export default EditRecord;
