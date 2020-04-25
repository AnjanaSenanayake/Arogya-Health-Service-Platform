const sql = require("./db.js");

// constructor
const Districts = function(district) {
  this.DistrictID = district.districtID;
  this.DistrictName = district.districtName;
};

Districts.getAll = (result) => {
    sql.query("SELECT * FROM Districts", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }
        console.log("District list: ", res);
        result(null, res);
    });
};

module.exports = Districts;