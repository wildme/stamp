import { useState } from 'react';
import ReactDOM from 'react-dom';

const ForgotPassModal = ({openModal, closeModal}) => {
  const [email, setEmail] = useState('');
  const handleReqCreds = () => {
    return 0;
  };

  if (!openModal) return null;
  return ReactDOM.createPortal(
    <div className="forgot-pass-grid-container" onClick={() => closeModal(true)}>
      <div className="forgot-pass-input-container" onClick={(e) => e.stopPropagation()}>
        <label htmlFor="email"><b>Forgot password?</b></label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="submit"
          id="submit"
          value="Send"
          onClick={(e) => handleReqCreds(e)}
        />
      </div>
    </div>,
    document.body
  );
};

export default ForgotPassModal;
