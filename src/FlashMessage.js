import { useState, useEffect } from 'react';
import { HiX } from 'react-icons/hi';

const FlashMessage = (props) => {
  const [hidden, setHidden] = useState(false);
  const styles = {};

  switch (props.type) {
    case 'success':
      styles["backgroundColor"] = "#2eb82e";
      break;
    case 'info':
      styles["backgroundColor"] = "#99ccffi";
      break;
    default:
      styles["backgroundColor"] = "#ff4d4d";
      break;
  }
  useEffect(() => {setHidden(false)}, [props.id]);

  return (
    <div
      className="flash-msg-container"
      hidden={hidden}
      style={{...styles}}>{props.msg}
      <span className="flash-msg-btn">
        <button onClick={() => setHidden(true)}><HiX /></button>
      </span>
    </div>
  );
};

export default FlashMessage;
