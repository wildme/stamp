import { useState } from 'react';
import { HiEyeOff, HiEye } from 'react-icons/hi';

const PasswordInputEye = (props) => {
  const [showPass, setShowPass] = useState(false);
  const className = props.className;
  const placeHolder = props.placeHolder || '';
  const value = props.value;
  const name = props.name || "pass";
  const title = props.title;
  const labelText = props.labelText || '';

  const divStyle = {
    display: "grid",
    gridTemplateColumns: "90% auto",
    border: "1px solid",
    padding: "4px"
  };
  const inputStyle = {
    border: "none",
    margin: 0,
    padding: 0,
    outline: "none"
  };
  const buttonStyle = {
    border: "none",
    cursor: "pointer",
    backgroundColor: "transparent",
    fontSize: "17px"
  };

  return (
    <div className={className}>
      {labelText ?
        <section className={`${className}__label`}>{labelText}</section> : null
      }
      <div
        className={`${className}__input`}
        style={divStyle}
      >
        <input
          id={name}
          style={inputStyle}
          type={showPass ? "text" : "password"}
          placeholder={placeHolder}
          name={name}
          value={value}
          required
          pattern="^[A-Za-z0-9!@#$%+^*_]+$"
          title={title}
          minLength="8"
          maxLength="255"
          onChange={(e) => props.setter(e.target.value)}
        />
        <button
          style={buttonStyle}
          type="button"
          onClick={() => setShowPass(!showPass)}>
          {showPass ? <HiEye /> : <HiEyeOff />}
        </button>
      </div>
    </div>
  );
};

export default PasswordInputEye;
