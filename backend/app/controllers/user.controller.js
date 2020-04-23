var crypto = require('crypto');
var uuid = require('uuid');
const User = require("../models/user.model.js");
const UserLogin = require("../models/user.profile.model.js");
const MESSAGES = require("../utils/messages.js");

// Create and Save a new user
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({message: "Content can not be empty!"});
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
              res.status(500).send({message:err.message || "Some error occurred while creating the User."});
              return;
            }
            else {
              res.send(result);
              return;
            }
          });
      } else {
        res.status(500).send({message: "Error retrieving user with nicpp " + req.body.uid});
        return;
      }
    } else
        res.send(MESSAGES.USER_ALREADY_EXISTS);
  });
};

// Retrieve all Users from the resultbase.
exports.findAll = (req, res) => {
  User.getAll((err, result) => {
    if (err) {
      res.status(500).send({message:err.message || "Some error occurred while retrieving customers."});
      return;
    }
    else {
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
          res.status(404).send({message: "Not found User with uid " + req.body.uid});
          return;
        } else {
          console.log('HERE2');
          res.status(500).send({message: "Error updating User with uid " + req.body.uid});
          return;
        }
      } else res.send(MESSAGES.UPDATE_SUCCESS);
      console.log('HERE3');
    }
  );
};

// Get child users by uid
exports.getAllChildUsers = (req,res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  User.getAllChildUsers(req.body.pid, (err,result) => {
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

// Validate an User identified by the nicpp in the request
exports.validateUser = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.validateUser(req.params.nicpp,req.params.validated,
    (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found User with nicpp ${req.params.nicpp}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating User with nicpp " + req.params.nicpp
          });
        }
      } else res.send(result);
    }
  );
};

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
