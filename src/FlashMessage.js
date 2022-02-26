import { useState } from 'react';
import { HiX } from 'react-icons/hi';

const FlashMessage = ({msg}) => {
  const [hidden, setHidden] = useState(false);

  return (
    <div className="flash-msg-container" hidden={hidden}>{msg}
      <span className="flash-msg-btn">
        <button onClick={() => setHidden(true)}><HiX /></button>
      </span>
    </div>
  );
};

export default FlashMessage;
