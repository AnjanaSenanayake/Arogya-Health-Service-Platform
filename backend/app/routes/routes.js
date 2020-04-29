var User = require("../controllers/user.controller.js");
var Profile = require("../controllers/user.profile.controller.js");
var AdminProfile = require("../controllers/admin.profile.controller.js");
var Admin = require("../controllers/admin.controller.js");

module.exports = app => {

  // Register a new user
  app.route('/register')
  .post(Profile.register);

  // login a user
  app.route('/login')
  .post(Profile.login);

  // Update a user with uid
  app.route('/updateUser')
  .post(User.update);

  // Create a new user
  app.route('/createUser')
  .post(User.create);

  // Retrieve user by NICPP
  app.route('/getUserByUID')
  .post(User.findOne);

  // Retrieve all child users with pid
  app.route('/getAllChildUsers')
  .post(User.getAllChildUsers);

  // Retrieve users with GNID  
  app.route('/getUsersByGNID')
  .post(User.getUsersByGNID);

  app.route('/adminRegister')
  .post(AdminProfile.register);

  app.route('/adminLogin')
  .post(AdminProfile.login);

  app.route('/InsertEpidemic')
  .post(Admin.insertEpidemic);

  app.route('/getAllEpidemics')
  .post(Admin.getAllEpidemics);

  app.route('/createEpidemicAlert')
  .post(User.createEpidemicAlert);

  app.route('/getAllDistricts')
  .post(Admin.getAllDistricts);

  app.route('/getDSByDistrict')
  .post(Admin.getDSByDistrict);

  app.route('/getGNByDivision')
  .post(Admin.getGNByDivision);

  app.route('/getDSByDistrictName')
  .post(User.getDSByDistrictName);

  app.route('/getGNByDivisionName')
  .post(User.getGNByDivisionName);

  // // Delete a user with nicpp
  // app.delete("/user/:nicpp", user.delete);

  // // Create a new user
  // app.delete("/user", user.deleteAll);
};
