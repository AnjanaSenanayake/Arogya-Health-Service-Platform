var crypto = require('crypto');

//Password util
var genRandomString = function (length) {
    return crypto.randomBytes(Math.ceil(length / 2))
        .toString('hex')
        .slice(0, length);
}

var sha512 = function (password, salt) {
    var hash = crypto.createHmac('sha512', salt);
    hash.update(password);
    var value = hash.digest('hex');
    return {
        salt: salt,
        passwordHash: value
    };
};

function saltHashPassword(userPassword) {
    var salt = genRandomString(16);
    var passwordData = sha512(userPassword, salt);
    return passwordData;
}

function checkHashPassword(userPassword, salt) {
    var passwordData = sha512(userPassword, salt);
    return passwordData;
}

function getMD5Hash(password) {
    var hash = crypto.createHash('md5', password);
    hash.update(password);
    var value = hash.digest('hex');
    return value;
};

module.exports = {
    saltHashPassword,
    checkHashPassword,
    getMD5Hash
};