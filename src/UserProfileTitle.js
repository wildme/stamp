const UserProfileTitle = (props) => {
  const t = props.t;
  const fullname = props.fullname;

  return (
    <div className="user-profile-title">
      <h2>{fullname}</h2>
      <p>{t('userProfile.subTitle')}</p>
    </div>
  );
};

export default UserProfileTitle;
