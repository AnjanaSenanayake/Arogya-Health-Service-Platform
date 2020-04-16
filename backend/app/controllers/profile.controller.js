var crypto = require('crypto');
var uuid = require('uuid');
const User = require("../models/user.model.js");
const Profile = require("../models/profile.model.js");

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
  };

  User.findByNICPP(req.body.nicpp, (err, result) => {
    if (err) {
      if (err.kind === "not_found") {
          // Save new User in the resultbase
          User.create(user, (err, result) => {
            if (err) {
              res.status(500).send({message:err.message || "Some error occurred while creating the User."});
              return;
            }else {
              Profile.createLogin(profile,(err, result) =>{
                  if (err) {
                    res.status(500).send({message:err.message || "Some error occurred while creating the User Login."});
                    return;
                  }
                  else {
                    res.send(result)
                    return;
                  }
              });
            };
          });
      } else {
        res.status(500).send({message: "Error retrieving user with nicpp " + req.params.nicpp});
        return;
      }
    } else {
      res.send({message:"User already exists"});
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
          res.status(500).send({message:err.message || "User does not exists"});
          return;
      } else {
        res.status(500).send({message: "Error retrieving user data for " + nicpp});
        return;
      }
    } else {
        console.log(result.UID);
        Profile.login(result.UID, (err, result) => {
            if(err) {
              if (err.kind === "not_found") {
                  res.status(500).send({message:err.message || "Profile does not exists"});
                  return;
              } else {
                res.status(500).send({message: "Error retrieving profile data for " + result.UID});
                return;
              }
            } else {
                var salt = result.Salt;
                var encryptedPassword = result.PasswordHash;

                var hash = crypto.createHmac('sha512', salt);
                hash.update(plainPassword);
                var value = hash.digest('hex');
                var hashedPassword = value;
                console.log(hashedPassword);

                if (encryptedPassword == hashedPassword) {
                    res.json('Login is success!');
                    res.end(JSON.stringify(result));
                } else {
                    res.json('Login failed!');
                }
            }
        });
    }
  });
};