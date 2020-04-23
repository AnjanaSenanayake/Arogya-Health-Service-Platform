var crypto = require('crypto');
var uuid = require('uuid');
const User = require("../models/user.model.js");
const Profile = require("../models/profile.model.js");
const MESSAGES = require("../utils/messages.js");

// Register a new user
exports.register = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }

  var uid = uuid.v4();
  var plain_password = req.body.password;
  var salt = crypto.randomBytes(Math.ceil(16 / 2)).toString('hex').slice(0, 16);
  var hash = crypto.createHmac('sha512', salt);
  hash.update(plain_password);
  var value = hash.digest('hex');
  var passwordHash = value;

  console.log(uid);

  // Create a User Login
  const profile = {
    UID: uid,
    PasswordHash: passwordHash,
    Salt: salt
  };

  // Create a User
  const user = {
    UID: uid,
    Name: req.body.name,
    NICPP: req.body.nicpp,
    PrimaryContact: req.body.primaryContact
  };

  User.findByUID(req.body.uid, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
          // Save new User in the resultbase
          Profile.register(user, (err, result) => {
            if (err) {
              res.status(500).send({message:err.message || MESSAGES.ERROR_WHILE_REGISTERING_USER});
              return;
            }else {
              Profile.createLogin(profile,(err, result) =>{
                  if (err) {
                    res.status(500).send({message:err.message || MESSAGES.ERROR_WHILE_REGISTERING_USER});
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
        res.status(500).send({message: MESSAGES.ERROR_RETRV_USER_WITH_NICPP + req.body.uid});
        return;
      }
    } else {
      res.send(MESSAGES.USER_ALREADY_EXISTS);
      console.log(MESSAGES.USER_ALREADY_EXISTS);
    }
  });
};


// login an user
exports.login = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }

  var nicpp = req.body.nicpp;
  var plainPassword = req.body.password;

  User.findByNICPP(nicpp, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
          res.send(MESSAGES.USER_DOES_NOT_EXISTS);
          console.log(MESSAGES.USER_DOES_NOT_EXISTS)
          return;
      } else {
        res.status(500).send({message: MESSAGES.ERROR_RETRV_USER_WITH_NICPP + nicpp});
        return;
      }
    } else {
        console.log(result.UID);
        Profile.login(result.UID, (err, result) => {
            if(err) {
              if (err.kind === "not_found") {
                  res.send(MESSAGES.USER_DOES_NOT_HAVE_LOGIN_ACCOUNT);
                  console.log(MESSAGES.USER_DOES_NOT_HAVE_LOGIN_ACCOUNT)
                  return;
              } else {
                res.status(500).send({message: MESSAGES.ERROR_RETRV_PROFILE_WITH_UID + result.UID});
                console.log(MESSAGES.ERROR_RETRV_PROFILE_WITH_UID + result.UID)
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