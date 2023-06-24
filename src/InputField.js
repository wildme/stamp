import { Fragment } from 'react';

 const InputField = (props) => {
  const attrs = props.attrs;
  const setter = props.setter;
  const value = props.value;
  const inputClassName = props.inputClassName;
  const labelClassName = props.labelClassName;

  return (
    <Fragment>
      <label htmlFor={attrs.for} className={labelClassName}>
      {attrs.text}
      </label>
      <input
        className={inputClassName}
        type={attrs.type}
        name={attrs.name}
        value={value}
        onChange={(e) => setter(e.target.value)}
      />
    </Fragment>
  )
};

export default InputField;
