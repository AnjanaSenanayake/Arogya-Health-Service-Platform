// Common Messages
const REGISTER_SUCCESS = 'Register success';
const LOGIN_SUCCESS = "Login success";
const LOGIN_ERROR = "Login Error";
const INCORRECT_PASSWORD = 'Incorrect password';
const UPDATE_SUCCESS = "Update success";
const NOT_FOUND = "Not found";

// User Register Messages
const ERROR_WHILE_REGISTERING_USER = 'Some error occurred while creating the User';
const ERROR_RETRV_USER_WITH_NICPP = 'Error retrieving user with nicpp: ';
const USER_ALREADY_EXISTS = 'User already exists';

// User Login Messages
const USER_DOES_NOT_EXISTS = "User does not exists";
const USER_DOES_NOT_HAVE_LOGIN_ACCOUNT = "User does not have a login account";
const ERROR_RETRV_PROFILE_WITH_UID = "Error retrieving profile with uid: ";

// User Update Messages
const NOT_FOUND_USER_WITH_NICPP = "Not found User with nicpp: ";
const ERROR_UPDATING_USER_WITH_NICPP = "Error updating User with nicpp ";

// Admin Register Messages
const ERROR_WHILE_REGISTERING_ADMIN = 'Some error occurred while creating the admin';
const ERROR_RETRV_ADMIN_WITH_NIC = 'Error retrieving admin with nic: ';
const ADMIN_ALREADY_EXISTS = 'Admin already exists';

// Admin Login Messages
const ADMIN_DOES_NOT_EXISTS = "Admin does not exists";
const ERROR_RETRV_PROFILE_WITH_NIC = "Error retrieving profile with nic: ";

module.exports = {
    ERROR_WHILE_REGISTERING_USER,
    ERROR_RETRV_USER_WITH_NICPP,
    USER_ALREADY_EXISTS,
    REGISTER_SUCCESS,
    USER_DOES_NOT_EXISTS,
    USER_DOES_NOT_HAVE_LOGIN_ACCOUNT,
    ERROR_RETRV_PROFILE_WITH_UID,
    LOGIN_SUCCESS,
    INCORRECT_PASSWORD,
    NOT_FOUND_USER_WITH_NICPP,
    ERROR_UPDATING_USER_WITH_NICPP,
    UPDATE_SUCCESS,
    ERROR_WHILE_REGISTERING_ADMIN,
    ERROR_RETRV_ADMIN_WITH_NIC,
    ADMIN_ALREADY_EXISTS,
    ADMIN_DOES_NOT_EXISTS,
    ERROR_RETRV_PROFILE_WITH_NIC,
    LOGIN_ERROR,
    NOT_FOUND
};