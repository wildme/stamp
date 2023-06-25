import { Fragment } from 'react';

const SelectField = (props) => {
  const attrs = props.attrs;
  const setter = props.setter;
  const options = props.options;
  const value = props.value;
  const selectClassName = props.selectClassName;
  const labelClassName = props.labelClassName;

  return (
    <Fragment>
      <lavel htmlFor={attrs.for} className={labelClassName}>
      {attrs.text}
      </label>
      <select
        className={selectClassName}
        name={attrs.name}
        value={value}
        onChange={(e) => setter(e.target.value)}
      >
      {options.map((k, v) => {
        return (
          <option value={k}>{v}</option>
        );
      })}
      </select>
    </Fragment>
  );
};

export default SelectField;
