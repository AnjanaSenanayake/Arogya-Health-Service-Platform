var crypto = require('crypto');
var uuid = require('uuid');
const User = require("../models/user.model.js");
const EpidemicAlerts = require("../models/epidemic.alerts.model.js");
const DivisionalSectretariats = require("../models/ds.model.js");
const GNDivisions = require("../models/gn.model.js");
const RequestCurfewPass = require("../models/request.pass.model.js");
const MESSAGES = require("../utils/messages.js");

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  var uid = uuid.v4();

  // Create a User
  const user = {
    UID: uid,
    PID: req.body.pid,
    Name: req.body.name,
    NICPP: req.body.nicpp,
    Gender: req.body.gender,
    DOB: req.body.dob,
    PrimaryContact: req.body.primaryContact,
    SecondaryContact1: req.body.secondaryContact1,
    SecondaryContact2: req.body.secondaryContact2,
    EmergencyContact: req.body.emergencyContact,
    EmergencyContactRelation: req.body.emergencyContactRelation,
    AddressLine1: req.body.addressLine1,
    AddressLine2: req.body.addressLine2,
    AddressLine3: req.body.addressLine3,
    AddressLine4: req.body.addressLine4,
    DSDivision: req.body.DSDivision,
    GNDivision: req.body.GNDivision,
    MaritalStatus: req.body.maritalStatus,
    IsVerified: req.body.isVerified
  };

  User.findByUID(req.body.uid, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        // Save new User in the database
        User.create(user, (err, result) => {
          if (err) {
            res.status(500).send({ message: err.message || "Some error occurred while creating the User." });
            return;
          }
          else {
            res.send(result);
            return;
          }
        });
      } else {
        res.status(500).send({ message: "Error retrieving user with nicpp " + req.body.uid });
        return;
      }
    } else
      res.send(MESSAGES.USER_ALREADY_EXISTS);
  });
};

// Retrieve all Users from the resultbase.
exports.getAllUsers = (req, res) => {
  User.getAll((err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving users." });
      return;
    }
    else {
      res.send(result);
      return;
    }
  });
};

// Retrieve Users by DSID from the resultbase.
exports.getUsersByDSID = (req, res) => {
  User.getAllByDSID(req.body.DSID, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving users." });
      return;
    } else {
      res.send(result);
      return;
    }
  });
};

// Retrieve Users by GNID from the resultbase.
exports.getUsersByGNID = (req, res) => {
  User.getAllByGNID(req.body.GNID, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving users." });
      return;
    } else {
      res.send(result);
      return;
    }
  });
};

// Find a single User with a uid
exports.findOne = (req, res) => {
  User.findByUID(req.body.uid, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with uid ${req.body.uid}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with uid " + req.body.uid
        });
      }
    } else res.send(result);
  });
};

// Update an User identified by the nicpp in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  const user = {
    UID: req.body.uid,
    Name: req.body.name,
    Gender: req.body.gender,
    DOB: req.body.dob,
    PrimaryContact: req.body.primaryContact,
    SecondaryContact1: req.body.secondaryContact1,
    SecondaryContact2: req.body.secondaryContact2,
    EmergencyContact: req.body.emergencyContact,
    EmergencyContactRelation: req.body.emergencyContactRelation,
    AddressLine1: req.body.addressLine1,
    AddressLine2: req.body.addressLine2,
    AddressLine3: req.body.addressLine3,
    AddressLine4: req.body.addressLine4,
    DSDivision: req.body.DSDivision,
    GNDivision: req.body.GNDivision,
    MaritalStatus: req.body.maritalStatus
  };

  console.log(user);
  User.update(req.body.uid, user,
    (err, result) => {
      if (err) {
        console.log('HERE0');
        if (err.kind === "not_found") {
          console.log('HERE1');
          res.status(404).send({ message: "Not found User with uid " + req.body.uid });
          return;
        } else {
          console.log('HERE2');
          res.status(500).send({ message: "Error updating User with uid " + req.body.uid });
          return;
        }
      } else res.send(MESSAGES.UPDATE_SUCCESS);
      console.log('HERE3');
    }
  );
};

// Get child users by uid
exports.getAllChildUsers = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.getAllChildUsers(req.body.pid, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found child users with pid ${req.body.pid}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving child users with pid " + req.body.pid
        });
      }
    } else res.send(result);
  });
}

// Delete an User with the specified nicpp in the request
exports.delete = (req, res) => {
  User.remove(req.params.nicpp, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with nicpp ${req.params.nicpp}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with nicpp " + req.params.nicpp
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Delete all User from the resultbase.
exports.deleteAll = (req, res) => {
  User.removeAll((err, result) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all user."
      });
    else res.send({ message: `All users were deleted successfully!` });
  });
};

// Alert for epidemic
exports.createEpidemicAlert = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  var newAlert = new EpidemicAlerts(req.body)

  EpidemicAlerts.createEpidemicAlert(newAlert, (err, result) => {
    if (err) {
      res.status(500).send({ message: `Error while inserting new patient ${newAlert}.` });
    } else res.send(result);
  });
}

// Retrieve all ds divisions for district from the resultbase.
exports.getDSByDistrictName = (req, res) => {
  DivisionalSectretariats.getDSByDistrictName(req.body.districtName, (err, result) => {
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
exports.getGNByDivisionName = (req, res) => {
  GNDivisions.getGNByDivisionName(req.body.DSName, (err, result) => {
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

// Request a curfew pass
exports.requestCurfewPass = (req, res) => {
  var requestedCurfewPass = new RequestCurfewPass(req.body);
  RequestCurfewPass.requestCurfewPass(requestedCurfewPass, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while creating a request" });
      return;
    }
    else {
      res.send(result);
      return;
    }
  });
};

// Retrieving a curfew passes by user
exports.getAllPassRequestsByUser = (req, res) => {
  RequestCurfewPass.getAllPassRequestsByUser(req.body.uid, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving requests" });
      return;
    }
    else {
      res.send(result);
      return;
    }
  });
};

// Retrieving a curfew passes for user
exports.getAllPassRequestsForUser = (req, res) => {
  RequestCurfewPass.getAllPassRequestsForUser(req.body.uid, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while retrieving requests" });
      return;
    }
    else {
      res.send(result);
      return;
    }
  });
};

exports.cancelRequestedPass = (req, res) => {
  RequestCurfewPass.cancelRequestedPass(req.body.requestID, (err, result) => {
    if (err) {
      res.status(500).send({ message: err.message || "Some error occurred while deleting requested pass" });
      return;
    }
    else {
      res.send(result);
      return;
    }
  });
};