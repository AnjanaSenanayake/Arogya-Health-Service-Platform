const User = require("../models/user.model.js");
const Admin = require("../models/admin.model.js");
const Epidemics = require("../models/epidemics.model.js");
const Districts = require("../models/districts.model.js");
const DivisionalSectretariats = require("../models/ds.model.js");
const GNDivisions = require("../models/gn.model.js");
const RequestCurfewPass = require("../models/request.pass.model.js");
const MESSAGES = require("../utils/messages.js");

// Get Admin data from admin AID
exports.getAdminByAID = (req, res) => {
  Admin.findByAID(req.body.AID, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving admin" });
      return;
    }
    else {
      res.send(result);
      return;
    }
  });
};


// Insert a new epidemic
exports.insertEpidemic = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  var newEpidemic = new Epidemics(req.body);

  Epidemics.insertEpidemic(newEpidemic, (err, result) => {
    if (err) {
      res.status(500).send({ message: `Error while inserting new epidemic ${newEpidemic}.` });
    } else res.send(result);
  });
}

// Retrieve all Epidemics from the resultbase.
exports.getAllEpidemics = (req, res) => {
  Epidemics.getAll((err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving infections" });
      return;
    }
    else {
      res.send(result);
      return;
    }
  });
};

// Validate an User identified by the uid in the request
exports.verifyUser = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.verifyUser(req.body, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with uid ${req.body.uid}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating User with uid " + req.body.uid
        });
      }
    } else {
      res.send(result);
      listnerPayload = {
        'uid': req.body.uid,
        'isVerified': req.body.isVerified
      };
      const io = req.app.locals.io;
      io.emit('verifyUser', listnerPayload);
    }
  }
  );
};

// delete an User identified by the uid in the request
exports.deleteUser = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.delete(req.body.uid, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with uid ${req.body.uid}.`
        });
      } else {
        res.status(500).send({
          message: "Error deleting User with uid " + req.body.uid
        });
      }
    } else res.send(result);
  }
  );
};

// Retrieve all districts from the resultbase.
exports.getAllDistricts = (req, res) => {
  Districts.getAll((err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving districts" });
      return;
    }
    else {
      res.send(result);
      return;
    }
  });
};

// Retrieve all ds divisions for district from the resultbase.
exports.getDSByDistrict = (req, res) => {
  DivisionalSectretariats.getDSByDistrict(req.body.DistrictID, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving divisionalSectretariats" });
      return;
    }
    else {
      res.send(result);
      return;
    }
  });
};

// Retrieve all gn divisions for division from the resultbase.
exports.getGNByDivision = (req, res) => {
  GNDivisions.getGNByDivision(req.body.DSID, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving grama niladhari divisions" });
      return;
    }
    else {
      res.send(result);
      return;
    }
  });
};

// Approve or deny request pass
exports.requestedPassApproveDeny = (req, res) => {
  RequestCurfewPass.requestedPassApproveDeny(req.body, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while approving/denying request pass" });
      return;
    }
    else {
      res.send(result);
      listnerPayload = {
        'status': req.body.status
      };
      const io = req.app.locals.io;
      io.emit('passApproval', listnerPayload);
      return;
    }
  });
}

// Get all passes
exports.getAllPassRequests = (req, res) => {
  RequestCurfewPass.getAllPassRequests((err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving request passes" });
      return;
    }
    else {
      res.send(result);
      listnerPayload = {
        'status': req.body.status
      };
      return;
    }
  });
}

// Get all passes by DSID
exports.getAllPassRequestsByDSID = (req, res) => {
  RequestCurfewPass.getAllPassRequestsByDSID(req.body.DSID,(err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving request passes" });
      return;
    }
    else {
      res.send(result);
      listnerPayload = {
        'status': req.body.status
      };
      return;
    }
  });
}

// Get all passes by GNID
exports.getAllPassRequestsByGNID = (req, res) => {
  RequestCurfewPass.getAllPassRequestsByGNID(req.body.GNID,(err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving request passes" });
      return;
    }
    else {
      res.send(result);
      listnerPayload = {
        'status': req.body.status
      };
      return;
    }
  });
}