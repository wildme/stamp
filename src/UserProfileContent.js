import { Routes, Route } from 'react-router-dom';
import UserInfo from './UserInfo.js';
import UserEmail from './UserEmail.js';
import UserPassword from './UserPassword.js';
import UserSettings from './UserSettings.js';

const UserProfileContent = ({ setInfoMsg }) => {

  return (
    <div className="user-profile-info">
      <Routes>
        <Route path="e-mail" element={<UserEmail setter={setInfoMsg} />} />
        <Route path="password" element={<UserPassword setter={setInfoMsg} />} />
        <Route path="settings" element={<UserSettings setter={setInfoMsg} />} />
        <Route path="*" element={<UserInfo setter={setInfoMsg} />} />
      </Routes>
    </div>
  );
};

export default UserProfileContent;
