const UserProfileTitle = (props) => {
  const fullname = props.fullname;
  const subtitle = props.subtitle;

  return (
    <div className="user-profile__title">
      <h2 className="user-profile__title_name">{fullname}</h2>
      <p className="user-profile__subtitle">{subtitle}</p>
    </div>
  );
};

export default UserProfileTitle;
