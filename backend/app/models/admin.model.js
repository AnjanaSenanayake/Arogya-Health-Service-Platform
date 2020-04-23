const sql = require("./db.js");

// constructor
const Admin = function (admin) {
  this.AID = admin.AID;
  this.Name = admin.name;
  this.NIC = admin.nic;
  this.position = admin.position;
  this.PrimaryContact = admin.primaryContact;
  this.DSID = admin.DSID;
  this.GNID = admin.GNID;
  this.ALID = admin.ALID;
  this.IsVerified = admin.isVerfied;
};

Admin.create = (newAdmin, result) => {
  console.log(newAdmin);

  var admin = {
    AID: newAdmin.AID,
    Name: newAdmin.Name,
    NIC: newAdmin.NIC,
    Position: newAdmin.Position,
    PrimaryContact: newAdmin.PrimaryContact,
    DSID: newAdmin.DSID,
    GNID: newAdmin.GNID,
    ALID: newAdmin.ALID,
    IsVerified: newAdmin.isVerfied
  };

  sql.query("INSERT INTO Admin SET ?", admin, (err, res) => {
    if (err) {
      console.log("New admin create error: ", err);
      result(err, null);
      return;
    } else {
      console.log("created admin: ", { id: res.insertId, ...newAdmin });
      result(null, { id: res.insertId, ...newAdmin });
    }
  });
};

Admin.findByNIC = (nic, result) => {
  sql.query("SELECT * FROM Admin WHERE NIC=?",[nic], (err, res) => {
    if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
    }else if (res.length) {
        console.log("found an admin: ", res[0]);
        result(null, res[0]);
        return;
    } else{
      // not found admin with the nic
      result({ kind: "not_found" }, null);
    }
  })
};

Admin.findByAID = (AID, result) => {
  sql.query("SELECT * FROM admin WHERE AID=?", [AID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }else if (res.length) {
        console.log("found an admin: ", res[0]);
        result(null, res[0]);
        return;
    } else{
      // not found admin with the nic
      result({ kind: "not_found" }, null);
    }
  });
};

Admin.getAll = result => {
  sql.query("SELECT * FROM Admin", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("All admins: ", res);
    result(null, res);
  });
};

Admin.update = (AID, admin, result) => {
  sql.query(
    "UPDATE admin SET Name = ?, Position = ?, PrimaryContact = ?, DSID = ?, GNID = ?, ALID = ?, IsVerified = ? WHERE AID = ?",[admin.Name, admin.Position, admin.PrimaryContact, admin.DSID, admin.GNID, admin.ALID, false, AID], (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      } else if (res.affectedRows == 0) {
        // not found admin with the id
        result({ kind: "not_found" }, null);
        console.log("not found admin");
        return;
      } else {
        result(null, res[0]);
        console.log("admin found");
        return;       
      }
    }
  );
};

Admin.validateAdmin = (nic, isValidated, result) => {
  sql.query("UPDATE Admin SET IsValidated = ? WHERE NIC = ?",
    [isValidated, nic],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found admin with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("validated admin: ", nic);
      result(null, { nic: nic, validated: isValidated });
    }
  );
};

Admin.remove = (nic, result) => {
  sql.query("DELETE FROM Admin WHERE NIC = ?", nic, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found admin with the nic
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted admin with NIC: ", nic);
    result(null, res);
  });
};

Admin.removeAll = result => {
  sql.query("DELETE FROM Admin", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log(`deleted ${res.affectedRows} admins`);
    result(null, res);
  });
};

module.exports = Admin;
