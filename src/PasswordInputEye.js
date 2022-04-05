import { useState } from 'react';
import { HiEyeOff, HiEye } from 'react-icons/hi';

const PasswordInputEye = (props) => {
  const [showPass, setShowPass] = useState(false);

  const handleShowPass = (e) => {
    e.preventDefault();
    setShowPass(!showPass);
  };

  return (
    <div className="password-input-container">
      <input
        type={showPass ? "text" : "password"}
        placeholder={props.place ? props.place : ""}
        id="pass"
        name={props.name ? props.name : "pass"}
        value={props.pass}
        required
        minLength="8"
        maxLength="255"
        onChange={(e) => props.setter(e.target.value)}
      />
      <button
        id="pass"
        type="button"
        onClick={(e) => handleShowPass(e)}>
        { showPass ? <HiEye /> : <HiEyeOff /> }
      </button>
    </div>
  );
};

export default PasswordInputEye;
