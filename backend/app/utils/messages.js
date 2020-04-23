// Register Messages
const ERROR_WHILE_REGISTERING_USER = 'Some error occurred while creating the User';
const ERROR_RETRV_USER_WITH_NICPP = 'Error retrieving user with nicpp: ';
const USER_ALREADY_EXISTS = 'User already exists';
const REGISTER_SUCCESS = 'Register success';

// Login Messages
const USER_DOES_NOT_EXISTS = "User does not exists";
const USER_DOES_NOT_HAVE_LOGIN_ACCOUNT = "User does not have a login account";
const ERROR_RETRV_PROFILE_WITH_UID = "Error retrieving profile with uid: ";
const LOGIN_SUCCESS = "Login success";
const INCORRECT_PASSWORD = 'Incorrect password';

// Update Messages
const NOT_FOUND_USER_WITH_NICPP = "Not found User with nicpp: ";
const ERROR_UPDATING_USER_WITH_NICPP = "Error updating User with nicpp ";
const UPDATE_SUCCESS = "Update success";

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
    UPDATE_SUCCESS
};