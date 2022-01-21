import { Fragment } from 'react';
import Autocomplete from './Autocomplete.js';

 const InputField = ({ attrs, setter, value, auto = false , field }) => {
  const handleInputChange = (e) => {
    setter(e.target.value);
  };
  return auto ? (
    <Autocomplete
      field={field}
      attrs={attrs}
      value={value}
      setter={setter}
    />
  ) : (
    <Fragment>
      <label htmlFor={attrs.for}>
        <b>{attrs.text}</b>
      </label>
      <input
        type={attrs.type}
        name={attrs.name}
        value={value}
        onChange={(e) => handleInputChange(e)}
      />
    </Fragment>
  )
};

export default InputField;
