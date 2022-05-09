const UserProfileTitle = (props) => {
  const t = props.t;
  const fullname = props.fullname;

  return (
    <div className="user-profile__title">
      <h2 className="user-profile__title_name">{fullname}</h2>
      <p className="user-profile__subtitle">{t('userProfile.subTitle')}</p>
    </div>
  );
};

export default UserProfileTitle;
