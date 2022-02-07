const PersonalInfo = ({ firstname, lastname, setterF, setterL }) => {

const handleFirstnameChange = (e) => {
  setterF(e.target.value);
};

const handleLastnameChange = (e) => {
  setterL(e.target.value);
};

const handleInfoUpdate = (e) => {
  e.preventDefault();
  return;
};

  return (
    <div className="user-info-grid-container">
      <div className="user-info-title-container">
        <h2>Change personal info</h2>
      </div>
      <div className="user-info-input-container">
        <label htmlFor="firstname"><b>Firstname</b></label>
        <input type="text" name="firstname" value={firstname}
          onChange={(e) => handleFirstnameChange(e)}
        />
        <label htmlFor="lastname"><b>Lastname</b></label>
        <input type="text" name="lastname" value={lastname}
          onChange={(e) => handleLastnameChange(e)}
        />
      </div>
      <div className="user-info-update-btn-container">
        <button type="submit" onClick={(e) => handleInfoUpdate(e)}>
          Update</button>
      </div>
    </div>
  );
};
 export default PersonalInfo;
