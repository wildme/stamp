const Email = ({ email, setter }) => {

const handleEmailChange = (e) => {
  setter(e.target.value);
};

const handleEmailUpdate = (e) => {
  e.preventDefault();
  return;
};

  return (
    <div className="user-info-grid-container">
      <div className="user-info-title-container">
        <h2>Change Email</h2>
      </div>
      <div className="user-info-input-container">
        <label htmlFor="email"><b>Email</b></label>
        <input type="text" name="email" value={email}
          onChange={(e) => handleEmailChange(e)}
        />
      </div>
      <div className="user-info-update-btn-container">
        <button type="submit" onClick={(e) => handleEmailUpdate(e)}>
          Update</button>
      </div>
    </div>
  );
};
 export default Email;
