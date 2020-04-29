const sql = require("./db.js");

// constructor
const User = function (user) {
  this.UID = user.uid;
  this.PID = user.pid;
  this.Name = user.name;
  this.NICPP = user.nicpp;
  this.Gender = user.gender;
  this.DOB = user.dob;
  this.PrimaryContact = user.primaryContact;
  this.SecondaryContact1 = user.secondaryContact1;
  this.SecondaryContact2 = user.secondaryContact2;
  this.EmergencyContact = user.emergencyContact;
  this.EmergencyContactRelation = user.emergencyContactRelation;
  this.AddressLine1 = user.addressLine1;
  this.AddressLine2 = user.addressLine2;
  this.AddressLine3 = user.addressLine3;
  this.AddressLine4 = user.addressLine4;
  this.DSDivision = user.DSDivision;
  this.GNDivision = user.GNDivision;
  this.MaritalStatus = user.maritalStatus;
  this.IsVerified = user.isVerfied;
};

User.create = (newUser, result) => {
  console.log(newUser);

  var user = {
    UID: newUser.UID,
    PID: newUser.PID,
    Name: newUser.Name,
    NICPP: newUser.NICPP,
    Gender: newUser.Gender,
    DOB: newUser.DOB,
    PrimaryContact: newUser.PrimaryContact
  };

  sql.query("INSERT INTO User SET ?", user, (err, res) => {
    if (err) {
      console.log("New user create error: ", err);
      result(err, null);
      return;
    } else {

      var contactData = {
        UID: newUser.UID,
        SecondaryContact1: newUser.SecondaryContact1,
        SecondaryContact2: newUser.SecondaryContact2,
        EmergencyContact: newUser.EmergencyContact,
        EmergencyContactRelation: newUser.EmergencyContactRelation
      };

      sql.query("INSERT INTO UserContactData SET ?", contactData, (err, res) => {
        if (err) {
          console.log("Add user contact error: ", err);
          return;
        }
      });

      var addressData = {
        UID: newUser.UID,
        AddressLine1: newUser.AddressLine1,
        AddressLine2: newUser.AddressLine2,
        AddressLine3: newUser.AddressLine3,
        AddressLine4: newUser.AddressLine4,
        DSDivision: newUser.DSDivision,
        GNDivision: newUser.GNDivision
      };

      sql.query("INSERT INTO UserResidentialData SET ?", addressData, (err, res) => {
        if (err) {
          console.log("Add user residential data error: ", err);
          return;
        }
      });

      console.log("created user: ", { id: res.insertId, ...newUser });
      result(null, { id: res.insertId, ...newUser });
    }
  });
};

User.findByNICPP = (nicpp, result) => {
  sql.query("SELECT * FROM User WHERE NICPP=?", [nicpp], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else if (res.length) {
      console.log("found an user: ", res[0]);
      result(null, res[0]);
      return;
    } else {
      // not found user with the nicpp
      result({ kind: "not_found" }, null);
    }
  })
};

User.findByUID = (uid, result) => {
  sql.query("SELECT * FROM User LEFT JOIN UserContactData ON User.UID = UserContactData.UID LEFT JOIN UserResidentialData ON User.UID = UserResidentialData.UID LEFT JOIN DivisionalSecretariats ON DivisionalSecretariats.DSID = UserResidentialData.DSDivision LEFT JOIN GramaNiladhariDivisions ON GramaNiladhariDivisions.GNID = UserResidentialData.GNDivision LEFT JOIN Districts ON Districts.DistrictID = DivisionalSecretariats.DistrictID WHERE User.UID=?", [uid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else if (res.length) {
      var user = res[0];
      user.UID = uid;
      console.log("found user: ", user);
      result(null, user);
      return;
    } else {
      // not found user with the nicpp
      result({ kind: "not_found" }, null);
    }
  });
};

User.createChildUser = (newChildUser, result) => {
  console.log(newChildUser);
  sql.query("INSERT INTO User SET ?", newChildUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created child user: ", { id: res.insertId, ...newChildUser });
    result(null, { id: res.insertId, ...newChildUser });
  });
};

User.getAllChildUsers = (uid, result) => {
  sql.query("SELECT * FROM User WHERE PID=?", [uid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    } else {
      console.log("all child users: ", res);
      result(null, res);
    }
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

User.getAllByGNID = (GNID, result) => {
  sql.query("SELECT * FROM User,UserContactData,UserResidentialData WHERE UserResidentialData.GNDivision=? AND UserResidentialData.UID = UserContactData.UID AND UserResidentialData.UID = User.UID", [GNID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else if (res.length) {
      console.log("found user: ", res);
      result(null, res);
      return;
    }
  });
};

User.update = (uid, user, result) => {
  sql.query(
    "UPDATE User SET Name = ?, PrimaryContact = ?, Gender = ?, DOB = ?, MaritalStatus = ?, IsVerified = ? WHERE UID = ?", [user.Name, user.PrimaryContact, user.Gender, user.DOB, user.MaritalStatus, false, uid], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      } else if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        console.log("not_found User");
        return;
      } else {
        var contactData = {
          UID: uid,
          SecondaryContact1: user.SecondaryContact1,
          SecondaryContact2: user.SecondaryContact2,
          EmergencyContact: user.EmergencyContact,
          EmergencyContactRelation: user.EmergencyContactRelation
        };
        console.log(contactData);
        sql.query(
          "INSERT INTO UserContactData SET ? ON DUPLICATE KEY UPDATE SecondaryContact1=VALUES(SecondaryContact1), SecondaryContact2=VALUES(SecondaryContact2), EmergencyContact=VALUES(EmergencyContact), EmergencyContactRelation=VALUES(EmergencyContactRelation)", contactData, (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(err, null);
              return;
            } else if (res.affectedRows == 0) {
              // not found User with the id
              result({ kind: "not_found" }, null);
              console.log("not_found UserContactData");
              return;
            } else {
              var addressData = {
                UID: uid,
                AddressLine1: user.AddressLine1,
                AddressLine2: user.AddressLine2,
                AddressLine3: user.AddressLine3,
                AddressLine4: user.AddressLine4,
                DSDivision: null,
                GNDivision: null
              };
              sql.query(
                "INSERT INTO UserResidentialData SET ? ON DUPLICATE KEY UPDATE AddressLine1=VALUES(AddressLine1), AddressLine2=VALUES(AddressLine2), AddressLine3=VALUES(AddressLine3), AddressLine4=VALUES(AddressLine4)", addressData, (err, res) => {
                  if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                  } else if (res.affectedRows == 0) {
                    // not found User with the id
                    result({ kind: "not_found" }, null);
                    console.log("not_found UserResidentialData");
                    return;
                  } else {
                    sql.query("UPDATE UserResidentialData SET DSDivision=(SELECT DSID FROM DivisionalSecretariats WHERE DivisionalSecretariatName=?) WHERE UID=?", [user.DSDivision, uid], (err, res) => {
                      if (err) {
                        console.log("error: ", err);
                      }
                    });
                    sql.query("UPDATE UserResidentialData SET GNDivision=(SELECT GNID FROM GramaNiladhariDivisions WHERE GNDivisionName=?) WHERE UID=?", [user.GNDivision, uid], (err, res) => {
                      if (err) {
                        console.log("error: ", err);
                      }
                    });
                    console.log("updated user: ", { uid: uid, ...user });
                    result(null, { uid: uid, ...user });
                  }
                });
            }
          });
      }
    });
};

User.verifyUser = (req, result) => {
  sql.query("UPDATE User SET IsVerified = ? WHERE UID = ?", [req.isVerified, req.uid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }
    if (res.affectedRows == 0) {
      // not found User with the uid
      result({ kind: "not_found" }, null);
      return;
    }
    console.log("verified user: ", req.uid);
    result(null, { UID: req.uid, IsVerified: req.isVerified });
  }
  );
};

User.delete = (UID, result) => {
  sql.query("DELETE FROM User WHERE UID = ?", [UID], (err, res) => {
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

    console.log("deleted user with UID: ", UID);
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
