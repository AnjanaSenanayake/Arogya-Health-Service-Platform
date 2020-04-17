var crypto = require('crypto');
var uuid = require('uuid');
const User = require("../models/user.model.js");
const UserLogin = require("../models/profile.model.js");

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
    Name: req.body.name,
    NICPP: req.body.nicpp,
    Gender: req.body.gender,
    DOB: req.body.dob,
    PrimaryContact: req.body.primaryContact,
    MaritalStatus: req.body.MaritalStatus,
    IsVerified: req.body.IsVerified
  };

  User.findByNICPP(req.params.nicpp, (err, result) => {
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
        res.status(500).send({message: "Error retrieving user with nicpp " + req.params.nicpp});
        return;
      }
    } else
        res.send({message: "User exists"});
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

// Find a single User with a nicpp
exports.findOne = (req, res) => {
  User.findByNICPP(req.params.nicpp, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found user with nicpp ${req.params.nicpp}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving user with nicpp " + req.params.nicpp
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

  console.log(req.body);

  User.updateByNICPP(
    req.params.nicpp,
    new User(req.body),
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

//Password util
var genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

var sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

function saltHashPassword(userPassword) {
    var salt = genRandomString(16);
    var passwordData = sha512(userPassword, salt);
    return passwordData;
}

function checkHashPassword(userPassword, salt) {
    var passwordData = sha512(userPassword, salt);
    return passwordData;
}
