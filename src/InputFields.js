import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';
import Autocomplete from './Autocomplete.js';

 const InputField = (props) => {
  const { t } = useTranslation();
  const attrs = props.attrs;
  const setter = props.setter;
  const value = props.value;
  const auto = props.auto ?? false;
  const field = props.field;
  const className = props.className;

  const handleInputChange = (e) => {
    setter(e.target.value);
  };
  return auto ? (
    <Autocomplete
      className={className}
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
        className={className}
        type={attrs.type}
        name={attrs.name}
        value={value}
        onChange={(e) => handleInputChange(e)}
      />
    </Fragment>
  )
};

export default InputField;
