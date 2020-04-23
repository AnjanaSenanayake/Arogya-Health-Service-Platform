const sql = require("./db.js");

// constructor
const AdminProfile = function(profile) {
  this.AID = profile.aid;
  this.PasswordHash = profile.passwordHash;
  this.Salt = profile.salt;
};

//////////////////////////////////////////////Admin Profile Models/////////////////////////////////////////////////////////////

AdminProfile.register = (newAdmin, result) => {
    console.log(newAdmin);
    sql.query("INSERT INTO Admin SET ?", newAdmin, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } else {
  
        console.log("created new admin: ", { id: res.insertId, ...newAdmin });
        result(null, { id: res.insertId, ...newAdmin });
      }
    });
  };

  AdminProfile.createLogin = (newAdminProfile, result) => {
    sql.query("INSERT INTO AdminLogin SET ?", newAdminProfile, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
  
      console.log("created new admin profile: ", { id: res.insertId, ...newAdminProfile });
      result(null, { id: res.insertId, ...newAdminProfile });
    });
  };
  
  AdminProfile.login = (aid, result) => {
    sql.query("SELECT * FROM AdminLogin WHERE AID=?", aid, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      console.log("login exists for admin: ", res[0]);
      result(null, res[0]);
    });
  };

  module.exports = AdminProfile;