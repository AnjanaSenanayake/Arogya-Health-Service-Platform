const sql = require("./db.js");

// constructor
const GNDivision = function(GNDivision) {
    this.GNID = GNDivision.GNID;
    this.DSID = GNDivision.DSID;
    this.GNDivisionName = GNDivision.GNDivisionName;
};

GNDivision.getGNByDivision = (DSID, result) => {
    sql.query("SELECT * FROM GramaNiladhariDivisions WHERE DSID=?", [DSID], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("GramaNiladhariDivisions list for " + DSID + ": ", res);
        result(null, res);
    });
};

GNDivision.getGNByDivisionName = (DSName, result) => {
    sql.query("SELECT * FROM GramaNiladhariDivisions WHERE DSID=(SELECT DSID FROM DivisionalSecretariats WHERE DivisionalSecretariatName=?)", [DSName], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("GramaNiladhariDivisions list for " + DSName + ": ", res);
        result(null, res);
    });
};

GNDivision.getAll = (result) => {
    sql.query("SELECT * FROM GramaNiladhariDivisions", (err, res) => {
        if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
        }
        console.log("GramaNiladhariDivisions list: ", res);
        result(null, res);
    });
};

module.exports = GNDivision;