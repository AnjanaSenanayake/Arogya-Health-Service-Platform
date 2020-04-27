const sql = require("./db.js");

// constructor
const EpidemicAlerts = function(epidemicAlerts) {
    this.UID = epidemicAlerts.UID;
    this.EpidemicID = epidemicAlerts.epidemicID;
    this.AlertDate = epidemicAlerts.alertDate;
    this.IsVerified = epidemicAlerts.isVerified;
};

EpidemicAlerts.createEpidemicAlert = (newAlert, result) => {
    newAlert.IsVerified = false;
    if (newAlert.EpidemicID == 0) {
      sql.query("DELETE FROM EpidemicAlert WHERE UID=?", newAlert.UID, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        console.log("deleted epidemic alert: ", { id: res.insertId, ...newAlert });
        result(null, { id: res.insertId, ...newAlert });
      });
    } else {
      sql.query("INSERT INTO EpidemicAlert SET ?", newAlert, (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(err, null);
          return;
        }
  
        console.log("created new epidemic alert: ", { id: res.insertId, ...newAlert });
        result(null, { id: res.insertId, ...newAlert });
      });
    }
};

module.exports = EpidemicAlerts;