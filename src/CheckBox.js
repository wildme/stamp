import { Fragment } from 'react';

const CheckBox = (props) => {
  const setter = props.setter;
  const value = props.value;
  const className = props.className;
  const name = props.name;
  const id = props.id;
  const label = props.label;
  return (
    <Fragment>
      <input
        className={className}
        type="checkbox"
        name={name}
        checked={value}
        id={id}
        onChange={() => setter(!value)}
      />
      <label htmlFor={name}>{label}</label>
    </Fragment>
  );
};

export default CheckBox;
