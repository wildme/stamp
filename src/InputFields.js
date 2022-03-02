import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import Autocomplete from './Autocomplete.js';

 const InputField = ({ attrs, setter, value, auto = false , field }) => {
  const { t } = useTranslation();
  const handleInputChange = (e) => {
    setter(e.target.value);
  };
  return auto ? (
    <Autocomplete
      field={field}
      attrs={attrs}
      value={value}
      setter={setter}
      t={t}
    />
  ) : (
    <Fragment>
      <label htmlFor={attrs.for}>
        <b>{ t(attrs.text) }</b>
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
