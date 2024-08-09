import { Fragment } from 'react';

const SelectFieldDocCode = (props) => {
  const attrs = props.attrs;
  const setter = props.setter;
  const value = props.value;
  const fields = props.fields;
  const options = props.options;
  const selectClassName = props.selectClassName;
  const labelClassName = props.labelClassName;

  return (
    <Fragment>
      <label htmlFor={attrs.for} className={labelClassName}>
      {attrs.text}
      </label>
      <select
        className={selectClassName}
        name={attrs.name}
        value={value}
        onChange={(e) => setter(e.target.value)}
      >
      {options.map((opt, i) => {
        return (
          <option value={opt[fields[0]]} key={i}>
            {opt[fields[0]] + ' - ' + opt[fields[1]]}
          </option>
        );
      })}
      </select>
    </Fragment>
  );
};

export default SelectFieldDocCode;
