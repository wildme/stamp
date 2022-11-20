import { useState, Fragment, useEffect } from 'react';

const DropZoneFileUpload = (props) => {
  const title = props.title;
  const maxFileSizeExceededMsg = props.maxFileSizeExceededMsg;
  const clearOnSuccess = props?.clearOnSuccess;
  const setter = props.setter;
  const className = props.className;
  const [filename, setFilename] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const MAX_FILE_SIZE = props.maxFileSize;

  const onDragOver = (e) => {
    e.preventDefault();
    const doc = document.querySelector(`.${className}`);
    doc.classList.add(`${className}_active`);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    const doc = document.querySelector(`.${className}`);
    doc.classList.remove(`${className}_active`);
  };

  const onDrop = (e) => {
    e.preventDefault();
    const doc = document.querySelector(`.${className}`);
    const { files } = e.dataTransfer;

    if (Number(files[0].size) > MAX_FILE_SIZE) {
      setErrorMsg(maxFileSizeExceededMsg);
      setter(null);
      setFilename(null);
    } else {
      doc.classList.remove(`${className}_active`);
      doc.classList.add(`${className}_added`);
      setErrorMsg(null);
      setFilename(files[0].name);
      setter(files[0]);
    }
  };

  useEffect(() => {
    setFilename(null);
    const doc = document.querySelector(`.${className}`);
    doc.classList.remove(`${className}_added`);
  }, [clearOnSuccess, className])
  
  return (
    <Fragment>
      <div
        className={className}
        onDrop={(e) => onDrop(e)}
        onDragOver={(e) => onDragOver(e)}
        onDragLeave={(e) => onDragLeave(e)}
      >
      {(!filename && !errorMsg) &&
        <section className={`${className}__title`}>
          {title}
        </section>}
      {filename &&
        <section className={`${className}__filename`}>
          {filename}
        </section>}
      {errorMsg &&
        <section className={`${className}__error`}>
          {errorMsg}
        </section>}
      </div>
    </Fragment>
  )
};

export default DropZoneFileUpload;
