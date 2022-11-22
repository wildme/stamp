import { Fragment } from 'react';
import { useTranslation } from 'react-i18next';

 const InputField = (props) => {
  const { t } = useTranslation();
  const id = props.id;
  const attrs = props.attrs;
  const setter = props.setter;
  const value = props.value;
  const inputClassName = props.inputClassName;
  const labelClassName = props.labelClassName;

  return (
    <Fragment>
      <label htmlFor={attrs.for} className={labelClassName}>
        {t(attrs.text)}
      </label>
      <input
        className={inputClassName}
        type={attrs.type}
        name={attrs.name}
        value={value}
        onChange={(e) => {
          setter(e.target.value);
          localStorage.setItem(`${attrs.name}-${id}`, e.target.value)
        }}
      />
    </Fragment>
  )
};

export default InputField;
