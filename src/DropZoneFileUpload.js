//import { useState } from 'react';

const DropZoneFileUpload = (props) => {
  const t = props.t;
  const setter = props.setter;
  const className = props.className;

  const onDragOver = (e) => {
    e.preventDefault();
    const doc = document.querySelector(`.${className}`);
    doc.classList.add(`${className}_dark`);

  };

  const onDragLeave = (e) => {
    e.preventDefault();
    const doc = document.querySelector(`.${className}`);
    doc.classList.remove(`${className}_dark`);
  }

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files;
    setter(file[0]);
  };
  
  return (
    <div>
        <section className={`${className}__title`}>Drop file</section>
    </div>
  )
};

export default DropZoneFileUpload;
