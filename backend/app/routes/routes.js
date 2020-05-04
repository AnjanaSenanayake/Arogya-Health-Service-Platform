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

  // Retrieve all users  
  app.route('/getAllUsers')
    .post(User.getAllUsers);

  // Retrieve users with DSID  
  app.route('/getUsersByDSID')
    .post(User.getUsersByDSID);

  // Retrieve users with GNID  
  app.route('/getUsersByGNID')
    .post(User.getUsersByGNID);

  app.route('/adminRegister')
    .post(AdminProfile.register);

  app.route('/adminLogin')
    .post(AdminProfile.login);

  app.route('/getAdminByAID')
    .post(Admin.getAdminByAID);

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

  app.route('/requestCurfewPass')
    .post(User.requestCurfewPass);

  app.route('/getAllPassRequestsByUser')
    .post(User.getAllPassRequestsByUser);

  app.route('/getAllPassRequestsForUser')
    .post(User.getAllPassRequestsForUser);

  app.route('/cancelRequestedPass')
    .delete(User.cancelRequestedPass);

  app.route('/verifyUser')
    .post(Admin.verifyUser);

  app.route('/deleteUser')
    .delete(Admin.deleteUser);

  app.route('/requestedPassApproveDeny')
    .post(Admin.requestedPassApproveDeny);

  app.route('/getAllPassRequests')
    .post(Admin.getAllPassRequests);

  app.route('/getAllPassRequestsByDSID')
    .post(Admin.getAllPassRequestsByDSID);

  app.route('/getAllPassRequestsByGNID')
    .post(Admin.getAllPassRequestsByGNID);

  app.route('/epidemicAlertApproveDeny')
    .post(Admin.epidemicAlertApproveDeny);

  app.route('/getEpidemicAlertsPending')
    .post(Admin.getEpidemicAlertsPending);

  app.route('/getEpidemicAlertsApproved')
    .post(Admin.getEpidemicAlertsApproved);
};
