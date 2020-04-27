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
  sql.query("SELECT * FROM User WHERE NICPP=?",[nicpp], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    } else if (res.length) {
      console.log("found an user: ", res[0]);
      result(null, res[0]);
      return;
  } else{
    // not found user with the nicpp
    result({ kind: "not_found" }, null);
  }
  })
};

User.findByUID = (uid, result) => {
  sql.query("SELECT * FROM User WHERE UID=?", [uid], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }else if (res.length) {
      var user = {
        UID: res[0].UID,
        PID: res[0].PID,
        Name: res[0].Name,
        NICPP: res[0].NICPP,
        PrimaryContact: res[0].PrimaryContact,
        DOB: res[0].DOB,
        Gender: res[0].Gender,
        MaritalStatus: res[0].MaritalStatus,
        IsVerified: res[0].IsVerified
      }
      sql.query("SELECT * FROM UserContactData WHERE UID=?", [user.UID], (err, res) => {
        if (err) {
          console.log("error: ", err);
        } else if(res.length) {
          user.SecondaryContact1 = res[0].SecondaryContact1;
          user.SecondaryContact2 = res[0].SecondaryContact2;
          user.EmergencyContact = res[0].EmergencyContact;
          user.EmergencyContactRelation = res[0].EmergencyContactRelation;
        }

        sql.query("SELECT * FROM UserResidentialData WHERE UID=?", [user.UID], (err, res) => {
          if (err) {
            console.log("error: ", err);
          } else if (res.length) {
            user.AddressLine1 = res[0].AddressLine1;
            user.AddressLine2 = res[0].AddressLine2;
            user.AddressLine3 = res[0].AddressLine3;
            user.AddressLine4 = res[0].AddressLine4;
            user.GNDivision = res[0].GNDivision;
            user.DSDivision = res[0].DSDivision;
          }      
          console.log("found user: ", user);
          result(null, user);
          return;
        });
      });
    } else{
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

User.update = (uid, user, result) => {
  sql.query(
    "UPDATE User SET Name = ?, PrimaryContact = ?, Gender = ?, DOB = ?, MaritalStatus = ?, IsVerified = ? WHERE UID = ?",[user.Name, user.PrimaryContact, user.Gender, user.DOB, user.MaritalStatus, false, uid], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      } else if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        console.log("not_found User");
        return;
      } else {
        sql.query(
          "UPDATE UserContactData SET SecondaryContact1 = ?, SecondaryContact2 = ?, EmergencyContact = ?, EmergencyContactRelation = ? WHERE UID = ?",[user.SecondaryContact1, user.SecondaryContact2, user.EmergencyContact, user.EmergencyContactRelation, uid], (err, res) => {
            if (err) {
              console.log("error: ", err);
              result(null, err);
              return;
            } else if (res.affectedRows == 0) {
              // not found User with the id
              var contactData = {
                UID: uid,
                SecondaryContact1: user.SecondaryContact1,
                SecondaryContact2: user.secondaryContact2,
                EmergencyContact: user.EmergencyContact,
                EmergencyContactRelation: user.EmergencyContactRelation
              };
              console.log(contactData);
              sql.query(
                "INSERT INTO UserContactData SET ?", contactData, (err, res) => {
                  if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                  } else if (res.affectedRows == 0) {
                    // not found User with the id
                    sql.query(
                      "UPDATE UserResidentialData SET AddressLine1 = ?, AddressLine2 = ?, AddressLine3 = ?, AddressLine4 = ?, DSDivision = ?, GNDivision = ? WHERE UID = ?",[user.AddressLine1, user.AddressLine2, user.AddressLine3, user.AddressLine4, user.DSDivision, user.GNDivision, uid], (err, res) => {
                        if (err) {
                          console.log("error: ", err);
                          result(null, err);
                          return;
                        } else if (res.affectedRows == 0) {
                          // not found User with the id
                          var addressData = {
                            UID: uid,
                            AddressLine1: user.AddressLine1,
                            AddressLine2: user.AddressLine2,
                            AddressLine3: user.AddressLine3,
                            AddressLine4: user.AddressLine4,
                            DSDivision: user.DSDivision,
                            GNDivision: user.GNDivision
                          };
                          sql.query(
                            "INSERT INTO UserResidentialData SET ?",addressData, (err, res) => {
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
                                console.log("updated user: ", { uid: uid, ...user });
                                result(null, { uid: uid, ...user });
                              }
                            }
                          );  
                        } else {
                          console.log("updated user: ", { uid: uid, ...user });
                          result(null, { uid: uid, ...user });
                        }
                      }
                    );  
                  } else {
                    sql.query(
                      "UPDATE UserResidentialData SET AddressLine1 = ?, AddressLine2 = ?, AddressLine3 = ?, AddressLine4 = ?, DSDivision = ?, GNDivision = ? WHERE UID = ?",[user.AddressLine1, user.AddressLine2, user.AddressLine3, user.AddressLine4, user.DSDivision, user.GNDivision, uid], (err, res) => {
                        if (err) {
                          console.log("error: ", err);
                          result(null, err);
                          return;
                        } else if (res.affectedRows == 0) {
                          // not found User with the id
                          var addressData = {
                            UID: uid,
                            AddressLine1: user.AddressLine1,
                            AddressLine2: user.AddressLine2,
                            AddressLine3: user.AddressLine3,
                            AddressLine4: user.AddressLine4,
                            DSDivision: user.DSDivision,
                            GNDivision: user.GNDivision
                          };
                          sql.query(
                            "INSERT INTO UserResidentialData SET ?",addressData, (err, res) => {
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
                                console.log("updated user: ", { uid: uid, ...user });
                                result(null, { uid: uid, ...user });
                              }
                            });
                        } else {
                          console.log("updated user: ", { uid: uid, ...user });
                          result(null, { uid: uid, ...user });
                        }
                      }
                    );  
                  }
                }
              );  
            }
          }
        );       
      }
    }
  );
};

User.validateUser = (uid, isValidated, result) => {
  sql.query(
    "UPDATE User SET IsValidated = ? WHERE UID = ?",
    [isValidated, uid],
    (err, res) => {
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

      console.log("validated user: ", uid);
      result(null, { UID: uid, validated: isValidated });
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
