import { Fragment } from 'react';
import Autocomplete from './Autocomplete.js';
import { country_list } from './countries.js';

export const InputField = ({ attrs, setter, value, auto = false }) => {
  const handleInputChange = (e) => {
    setter(e.target.value);
  };
  return auto ? (
    <Autocomplete
      options={country_list}
      attrs={attrs}
      value={value}
      setter={setter}
    />
  ) : (
    <Fragment>
      <label for={attrs.for}>
        <b>{attrs.text}</b>
      </label>
      <input
        type={attrs.type}
        name={attrs.name}
        value={value}
        onChange={(e) => handleInputChange(e)}
      />
    </Fragment>
  );
};
