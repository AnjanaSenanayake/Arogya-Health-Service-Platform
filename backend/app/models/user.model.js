const sql = require("./db.js");

// constructor
const User = function(user) {
  this.UID = user.uid;
  this.Name = user.name;
  this.NICPP = user.nicpp;
  this.Gender = user.gender;
  this.DOB = user.dob;
  this.MaritalStatus = user.maritalStatus;
  this.IsVerified = user.isVerfied;
};

User.create = (newUser, result) => {
  console.log(newUser);
  sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findByNICPP = (nicpp, result) => {
  sql.query("SELECT * FROM User WHERE NICPP=?",[nicpp], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found user: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found user with the nicpp
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM User", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

User.updateByNICPP = (nicpp, user, result) => {
  sql.query(
    "UPDATE User SET Name = ?, NICPP = ? WHERE NICPP = ?",
    [user.name, user.nicpp, nicpp],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated user: ", { nicpp: nicpp, ...user });
      result(null, { nicpp: nicpp, ...user });
    }
  );
};

User.validateUser = (nicpp,isValidated, result) => {
  sql.query(
    "UPDATE User SET IsValidated = ? WHERE NICPP = ?",
    [isValidated,nicpp],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("validated user: ", nicpp);
      result(null, { nicpp: nicpp, validated: isValidated});
    }
  );
};

User.remove = (id, result) => {
  sql.query("DELETE FROM User WHERE id = ?", nicpp, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the nicpp
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted user with nicpp: ", nicpp);
    result(null, res);
  });
};

User.removeAll = result => {
  sql.query("DELETE FROM User", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} users`);
    result(null, res);
  });
};

module.exports = User;
