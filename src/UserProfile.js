import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import UserProfileMenu from './UserProfileMenu.js';
import UserProfileTitle from './UserProfileTitle.js';
import UserProfileContent from './UserProfileContent.js';
import FlashMessage from './FlashMessage.js';

const UserProfile = () => {
  const [infoMsg, setInfoMsg] = useState({str: '', id: 0, type: 'error' });
  const fullname = useSelector((state) => state.info.fullname);
  const { t } = useTranslation();

  return (
    <div className="user-profile-grid">
    {infoMsg.str &&
       <FlashMessage msg={infoMsg.str} id={infoMsg.id } type={infoMsg.type} />}
      <div className="user-profile">
        <UserProfileTitle
          subtitle={t('userProfile.subTitle')}
          fullname={fullname}
        />
        <UserProfileMenu />
        <UserProfileContent setInfoMsg={setInfoMsg} />
      </div>
    </div>
  );
};

export default UserProfile;
