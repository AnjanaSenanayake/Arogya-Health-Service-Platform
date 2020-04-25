const sql = require("./db.js");

// constructor
const Infections = function(Infections) {
  this.InfectionID = Infections.infectionID;
  this.InfectionName = Infections.infectionName;
};

Infections.getAll = (result) => {
    sql.query("SELECT * FROM Infections", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }
        console.log("infections list: ", res);
        result(null, res);
    });
};

module.exports = Infections;