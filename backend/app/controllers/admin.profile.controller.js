var crypto = require('crypto');
var uuid = require('uuid');
const Admin = require("../models/admin.model.js");
const AdminProfile = require("../models/admin.profile.model.js");
const MESSAGES = require("../utils/messages.js");

//////////////////////////////////////////////Admin Profile Controllers//////////////////////////////////////////////////////////////

// Register a new admin
exports.register = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
    }
  
    var aid = uuid.v4();
    var plain_password = req.body.password;
    var salt = crypto.randomBytes(Math.ceil(16 / 2)).toString('hex').slice(0, 16);
    var hash = crypto.createHmac('sha512', salt);
    hash.update(plain_password);
    var value = hash.digest('hex');
    var passwordHash = value;
  
    console.log("AID: " +aid);
  
    // Create a admin Login
    const adminProfile = {
      AID: aid,
      PasswordHash: passwordHash,
      Salt: salt
    };
  
    // Create an Admin
    const admin = {
      AID: aid,
      Name: req.body.name,
      NIC: req.body.nic,
      Position: req.body.position,
      PrimaryContact: req.body.primaryContact,
      DSID: req.body.DSID,
      GNID: req.body.GNID,
      ALID: req.body.ALID
    };
  
    Admin.findByNIC(req.body.nic, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
            // Save new Admin in the resultbase
            AdminProfile.register(admin, (err, result) => {
              if (err) {
                res.status(500).send({message:err.message || MESSAGES.ERROR_WHILE_REGISTERING_ADMIN});
                return;
              }else {
                AdminProfile.createLogin(adminProfile,(err, result) =>{
                    if (err) {
                      res.status(500).send({message:err.message || MESSAGES.ERROR_WHILE_REGISTERING_ADMIN});
                      return;
                    }
                    else {
                      res.send(MESSAGES.REGISTER_SUCCESS)
                      return;
                    }
                });
              };
            });
        } else {
          res.status(500).send({message: MESSAGES.ERROR_RETRV_ADMIN_WITH_NIC + req.body.nic});
          return;
        }
      } else {
        res.send(MESSAGES.ADMIN_ALREADY_EXISTS);
        console.log(MESSAGES.ADMIN_ALREADY_EXISTS);
      }
    });
  };

// login an admin
exports.login = (req, res) => {
    // Validate request
    if (!req.body) {
      res.status(400).send({message: "Content can not be empty!"});
      return;
    }
  
    var nic = req.body.nic;
    var plainPassword = req.body.password;
  
    Admin.findByNIC(nic, (err, result) => {
      if (err) {
        if (err.kind === "not_found") {
            res.send(MESSAGES.ADMIN_DOES_NOT_EXISTS);
            console.log(MESSAGES.ADMIN_DOES_NOT_EXISTS)
            return;
        } else {
          res.status(500).send({message: MESSAGES.ERROR_RETRV_ADMIN_WITH_NIC + nic});
          return;
        }
      } else {
          console.log(result.AID);
          AdminProfile.login(result.AID, (err, result) => {
              if(err) {
                if (err.kind === "not_found") {
                    res.send(MESSAGES.ADMIN_DOES_NOT_EXISTS);
                    console.log(MESSAGES.ADMIN_DOES_NOT_EXISTS)
                    return;
                } else {
                  res.status(500).send({message: MESSAGES.ERROR_RETRV_ADMIN_WITH_NIC + result.NIC});
                  console.log(MESSAGES.ERROR_RETRV_ADMIN_WITH_NIC + result.NIC)
                  return;
                }
              } else {
                  var salt = result.Salt;
                  var encryptedPassword = result.PasswordHash;
  
                  var hash = crypto.createHmac('sha512', salt);
                  hash.update(plainPassword);
                  var value = hash.digest('hex');
                  var hashedPassword = value;
                  
                  console.log(hashedPassword)
                  console.log(encryptedPassword)
  
                  if (encryptedPassword == hashedPassword) {
                      res.send(result);
                      console.log(MESSAGES.LOGIN_SUCCESS)
                      return;
                  } else {
                      res.send(MESSAGES.INCORRECT_PASSWORD);
                      console.log(MESSAGES.INCORRECT_PASSWORD)
                      return;
                  }
              }
          });
      }
    });
  };