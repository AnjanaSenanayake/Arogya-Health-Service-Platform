const sql = require("./db.js");
const FCM = require("../utils/firebase_messaging.js");

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

EpidemicAlerts.epidemicAlertApproveDeny = (req, result) => {
  sql.query("UPDATE EpidemicAlert SET IsVerified=? WHERE EpidemicAlertID=?", [req.isVerified, req.alertID], (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    console.log(res);
    if (req.isVerified == 1) {
      FCM.broadcastEpidemicContactAlert(req.UID, req.epidemic);
    }
    console.log("epidemic alert approve/deny: ", { alertid: req.alertID, isVerified: req.isVerified });
    result(null, { alertid: req.alertID, isVerified: req.isVerified });
  });
};

module.exports = EpidemicAlerts;