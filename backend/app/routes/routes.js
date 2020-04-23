var User = require("../controllers/user.controller.js");
var Profile = require("../controllers/user.profile.controller.js");
var AdminProfile = require("../controllers/admin.profile.controller.js");

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

  app.route('/adminRegister')
  .post(AdminProfile.register);

  app.route('/adminLogin')
  .post(AdminProfile.login);

  // // Delete a user with nicpp
  // app.delete("/user/:nicpp", user.delete);

  // // Create a new user
  // app.delete("/user", user.deleteAll);
};
