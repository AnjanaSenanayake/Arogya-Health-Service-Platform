const sql = require("./db.js");

// constructor
const DivisionalSectretariats = function (divisionalSectretariat) {
    this.DSID = divisionalSectretariat.DSID;
    this.DistrictID = divisionalSectretariat.districtID;
    this.DivisionalSectretariatName = divisionalSectretariat.divisionalSectretariatName;
};

DivisionalSectretariats.getDSByDistrict = (DistrictID, result) => {
    sql.query("SELECT * FROM DivisionalSecretariats WHERE DistrictID=?", [DistrictID], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("DivisionalSecretariats list for " + DistrictID + ": ", res);
        result(null, res);
    });
};

DivisionalSectretariats.getAll = (result) => {
    sql.query("SELECT * FROM DivisionalSectretariats", (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        console.log("DivisionalSectretariat list: ", res);
        result(null, res);
    });
};

module.exports = DivisionalSectretariats;