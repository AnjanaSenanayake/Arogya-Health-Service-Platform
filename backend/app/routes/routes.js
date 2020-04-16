var User = require("../controllers/user.controller.js");
var Profile = require("../controllers/profile.controller.js");

module.exports = app => {

  // Register a new user
  app.route('/register')
  .post(Profile.register);

  // login a user
  app.route('/login')
  .post(Profile.login);

  // // Create a new user
  // app.route('/create')
  // .post(User.create);

  // // Retrieve all users
  // app.route('/user')
  // .post(User.findAll);

  // // Retrieve a single user with nicpp
  // app.route('/user/:nicpp')
  // .post(User.findOne);

  // // Update a user with nicpp
  // app.put("/user/:nicpp", user.update);

  // // Delete a user with nicpp
  // app.delete("/user/:nicpp", user.delete);

  // // Create a new user
  // app.delete("/user", user.deleteAll);
};
