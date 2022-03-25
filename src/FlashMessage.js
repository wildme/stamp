import { useState, useEffect } from 'react';
import { HiX } from 'react-icons/hi';

const FlashMessage = (props) => {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {setHidden(false)}, [props.id]);

  return (
    <div className="flash-msg-container" hidden={hidden}>{props.msg}
      <span className="flash-msg-btn">
        <button onClick={() => setHidden(true)}><HiX /></button>
      </span>
    </div>
  );
};

export default FlashMessage;
