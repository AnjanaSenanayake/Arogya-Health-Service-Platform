const sql = require("./db.js");

// constructor
const InfectedPatients = function(infectedPatient) {
    this.UID = infectedPatient.uid;
    this.InfectionID = infectedPatient.infectionID;
    this.IdentifiedDate = infectedPatient.identifiedDate;
    this.IsVerified = infectedPatient.isVerified;
};

InfectedPatients.insertPatient = (newPatient, result) => {
    newPatient.IsVerified = false;
    sql.query("INSERT INTO InfectedPatients SET ?", newPatient, (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }

      console.log("created new patient: ", { id: res.insertId, ...newPatient });
      result(null, { id: res.insertId, ...newPatient });
    });
};

module.exports = InfectedPatients;