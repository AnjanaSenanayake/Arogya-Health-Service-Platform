const sql = require("./db.js");

// constructor
const RequestCurefewPass = function (requestCurefewPass) {
    this.RequestID = requestCurefewPass.requestID;
    this.RequestedFor = requestCurefewPass.requestedFor;
    this.RequestedBy = requestCurefewPass.requestedBy;
    this.Reason = requestCurefewPass.reason;
    this.WhereTo = requestCurefewPass.whereTo;
    this.ValidFrom = requestCurefewPass.validFrom;
    this.ValidTo = requestCurefewPass.validTo;
};

RequestCurefewPass.requestCurfewPass = (curfewPassRequest, result) => {
    sql.query("SELECT User.UID From User WHERE Name=?", curfewPassRequest.RequestedFor, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        } else if (res.affectedRows == 0) {
            result({ kind: "failed" }, null);
            return;
        } else {
            curfewPassRequest.RequestedFor = res[0].UID;
            sql.query("INSERT INTO RequestsForCurfewPass SET ?", curfewPassRequest, (err, res) => {
                if (err) {
                    console.log("error: ", err);
                    result(null, err);
                    return;
                } else if (res.affectedRows == 0) {
                    result({ kind: "failed" }, null);
                    return;
                }
                console.log("curfew pass requested: ", curfewPassRequest);
                result(null, res);
            }
            );
        }
    }
    );
};

RequestCurefewPass.getAllPassRequestsByUser = (uid, result) => {
    sql.query("Select RequestsForCurfewPass.*, User.Name FROM User, RequestsForCurfewPass WHERE RequestedBy=? AND User.UID = RequestsForCurfewPass.RequestedFor", [uid], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "failed" }, null);
            return;
        }
        console.log("curfew pass list: ", res);
        result(null, res);
    }
    );
};

RequestCurefewPass.getAllPassRequestsForUser = (uid, result) => {
    sql.query("Select * FROM RequestsForCurfewPass WHERE RequestedFor=?", [uid], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "failed" }, null);
            return;
        }
        console.log("curfew pass list: ", res);
        result(null, res);
    }
    );
};

RequestCurefewPass.cancelRequestedPass = (requestID, result) => {
    sql.query("DELETE FROM RequestsForCurfewPass WHERE RequestID=?", [requestID], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "failed" }, null);
            return;
        }
        console.log("curfew pass deleted: ", requestID);
        result(null, res);
    }
    );
};

RequestCurefewPass.requestedPassApproveDeny = (requestID, status, result) => {
    sql.query("UPDATE RequestsForCurfewPass SET Status=? WHERE RequestID=?", [status, requestID], (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(null, err);
            return;
        }

        if (res.affectedRows == 0) {
            result({ kind: "failed" }, null);
            return;
        }
        console.log("curfew pass deleted: ", requestID);
        result(null, res);
    }
    );
};

module.exports = RequestCurefewPass;