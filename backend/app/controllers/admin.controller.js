const Infections = require("../models/infections.model.js");
const Districts = require("../models/districts.model.js");
const DivisionalSectretariats = require("../models/ds.model.js");
const GNDivisions = require("../models/gn.model.js");
const MESSAGES = require("../utils/messages.js");

// Retrieve all Infections from the resultbase.
exports.getAllInfections = (req, res) => {
    Infections.getAll((err, result) => {
      if (err) {
        res.status(500).send({message:err.message || "Some error occurred while retrieving infections"});
        return;
      }
      else {
        res.send(result);
        return;
      } 
    });
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

// Retrieve all districts from the resultbase.
exports.getAllDistricts = (req, res) => {
  Districts.getAll((err, result) => {
    if (err) {
      res.status(500).send({message:err.message || "Some error occurred while retrieving districts"});
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
      res.status(500).send({message:err.message || "Some error occurred while retrieving divisionalSectretariats"});
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
      res.status(500).send({message:err.message || "Some error occurred while retrieving grama niladhari divisions"});
      return;
    }
    else {
      res.send(result);
      return;
    } 
  });
};