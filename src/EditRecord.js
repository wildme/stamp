import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import { InputAttrs as attrs } from './InputAttrs.js';
import InputField from './InputFields.js';

const EditRecord = () => {
  const { id, box } = useParams();
  const [subject, setSubject] = useState('');
  const [fromTo, setFromTo] = useState('');
  const [note, setNote] = useState('');
  const [replyTo, setReplyTo] = useState('');
  const [delFile, setDelFile] = useState(false);
  const [file, setFile] = useState(null);
  const [newFile, setNewFile] = useState(null);
  const history = useHistory();

  const handleEditRecord = (e) => {
    e.preventDefault();
    fetch(`/api/${box}/update/${id}`, {
      method: 'POST',
      body: JSON.stringify({ subject, fromTo, replyTo, note }),
      headers: {'Content-Type': 'application/json'}
      })
      .then(res => {
        if (!res.ok) throw new Error('Network issue occured');
      })
      .catch(err => console.error(err))

    if (delFile) {
      const fileId = file._id;
      fetch(`/api/delete/${fileId}`)
        .then(res => {
        if (!res.ok) throw new Error('Error occured!');
        })
        .catch(err => console.error(err))
    }

    setSubject('');
    setFromTo('');
    setNote('');
    setReplyTo('');
    history.replace(`/${box}`);
  };

  const handleDownload = (e) => {
    e.preventDefault(e);
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
      .catch(err => console.error(err))
  };

  const handleCheck = () => {
    setDelFile(!delFile);
  }

  useEffect(() => {
    fetch(`/api/${box}/${id}`)
      .then(res => res.json())
      .then(data => data.map((item) => {
        setSubject(item.subject);
        setFromTo(item.from || item.to);
        setNote(item.note);
        setReplyTo(item.replyTo);
      })
      )

    fetch(`/api/attachment/${box}/${id}`)
      .then(res => {
        if (res.status === 200) return res.json();
        if (!res.ok) throw new Error('Network issue occured');
    })
      .then(data => setFile(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="edit-grid-container">
      <div className="edit-container">
        <div className="input-container">
          <InputField
            attrs={attrs[`${box}`].filter((x) => x.name === 'subj')[0]}
            setter={setSubject}
            value={subject}
          />
          <InputField
            attrs={
              attrs[`${box}`].filter((x) => x.name === 'from' || x.name === 'to')[0]
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
        <div className="file-container">
          <div>  
            <input type="file" id="upload"/>
          </div>
          { file && <div>
            <a href="#" onClick={(e) => handleDownload(e)}>Download</a>
            <input type="checkbox" name="del-file" id="del" onChange={
              () => handleCheck()} />
            <label htmlFor="del-file">Delete file</label>
          </div> }
        </div>
        <div className="update-btn-container">
          <button type="submit" onClick={(e) => handleEditRecord(e)}>
          Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditRecord;
