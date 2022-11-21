import { Fragment, useRef, useEffect } from 'react';

const InputFile = (props) => {
  const label = props.label;
  const name = props.name;
  const clearOnSuccess = props?.clearOnSuccess;
  const className = props.className;
  const setter = props.setter;
  const setInfoMsg = props.setInfoMsg;
  const maxFileSizeExceededMsg = props.maxFileSizeExceededMsg;
  const maxFileSize = props.maxFileSize;
  const ref = useRef(null);

  const onChange = (e) => {
    if (e.target.files[0].size > maxFileSize) {
      setInfoMsg({str: maxFileSizeExceededMsg, id: Math.random()});
      setter(null);
      ref.current.value='';
      } else {
        setter(e.target.files[0]);
      }
  };

  useEffect(() => {
    ref.current.value='';
  }, [clearOnSuccess])

  return (
    <Fragment>
      <label htmlFor={name}><b>{label}</b></label>
        <input
          className={className}
          type="file"
          name={name}
          ref={ref}
          onChange={(e) => onChange(e)}
        />
    </Fragment>
  );
};

export default InputFile;
