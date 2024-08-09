import { Fragment } from 'react';

const SelectField = (props) => {
  const attrs = props.attrs;
  const setter = props.setter;
  const value = props.value;
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
      {attrs.options.map((opt, i) => {
        return (
          <option value={Object.keys(opt)[0]} key={i}>
          {Object.values(opt)[0]}
          </option>
        );
      })}
      </select>
    </Fragment>
  );
};

export default SelectField;
