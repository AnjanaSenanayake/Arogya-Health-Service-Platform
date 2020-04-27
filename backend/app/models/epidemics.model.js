const sql = require("./db.js");

// constructor
const Epidemics = function(epidemic) {
  this.EpidemicID = epidemic.epidemicID;
  this.EpidemicName = epidemic.epidemicName;
};

Epidemics.insertEpidemic = (newEpidemic, result) => {
  sql.query("INSERT INTO Epidemics SET ?", newEpidemic, (err, res) => {
      if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
      }
      console.log("created new epidemic: ", { id: res.insertId, ...newEpidemic});
      result(null, { id: res.insertId, ...newEpidemic});
  });
};

Epidemics.getAll = (result) => {
    sql.query("SELECT * FROM Epidemics", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }
        console.log("Epidemics list: ", res);
        result(null, res);
    });
};

module.exports = Epidemics;