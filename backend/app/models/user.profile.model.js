const sql = require("./db.js");

// constructor
const Profile = function(profile) {
  this.UID = profile.uid;
  this.PasswordHash = profile.passwordHash;
  this.Salt = profile.salt;
  this.IsAllowed = profile.isAllowed;
};

//////////////////////////////////////////////User Profile Models/////////////////////////////////////////////////////////////
Profile.register = (newUser, result) => {
  console.log(newUser);
  sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else {

      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    }
  });
};

Profile.createLogin = (newUserProfile, result) => {
  sql.query("INSERT INTO UserProfile SET ?", newUserProfile, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created new profile: ", { id: res.insertId, ...newUserProfile });
    result(null, { id: res.insertId, ...newUserProfile });
  });
};

Profile.login = (uid, result) => {
  sql.query("SELECT * FROM UserProfile WHERE UID=?", uid, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log("profile exists for: ", res[0]);
    result(null, res[0]);
  });
};

module.exports = Profile;
