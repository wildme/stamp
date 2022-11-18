import { useState, Fragment } from 'react';

const DropZoneFileUpload = (props) => {
  const t = props.t;
  const setter = props.setter;
  const className = props.className;
  const [filename, setFilename] = useState(null);

  const onDragOver = (e) => {
    e.preventDefault();
    const doc = document.querySelector(`.${className}`);
    doc.classList.add(`${className}_active`);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    const doc = document.querySelector(`.${className}`);
    doc.classList.remove(`${className}_active`);
  }

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const { files } = e.dataTransfer;
    setFilename(files[0].name);
  };
  
  return (
    <Fragment>
      <div
        className={className}
        onDrop={(e) => onDrop(e)}
        onDragOver={(e) => onDragOver(e)}
        onDragLeave={(e) => onDragLeave(e)}
      >
      {!filename &&
        <section className={`${className}__title`}>
          {t('dropZoneFile.title1')}
        </section>}
      {filename &&
        <section className={`${className}__filename`}>
          {filename}
        </section>}
      </div>
    </Fragment>
  )
};

export default DropZoneFileUpload;
