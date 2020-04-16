var crypto = require('crypto');
var uuid = require('uuid');
var express = require('express');
var mysql = require('mysql');
var bodyParser = require('body-parser');

//Connect to MySQL
var conn = mysql.createConnection({
    host: 'sql12.freemysqlhosting.net',
    user: 'sql12333208',
    password: 'aPPfY6IEa4',
    database: 'sql12333208',
    multipleStatements: true
});

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

var app = express();
app.use(bodyParser.json()); //Accept JSON params
app.use(bodyParser.urlencoded({
    extended: true //Accept URL encoded params
}));

//Register API
app.post('/register/', (req, res, next) => {
    var post_data = req.body;
    var uid = uuid.v4();
    var plain_password = post_data.password;
    var hash_data = saltHashPassword(plain_password);
    var password = hash_data.passwordHash;
    var salt = hash_data.salt;

    var name = post_data.name;
    var nic = post_data.nic;
    var mobile = post_data.mobile;

    console.log(uid);
    console.log(password);
    console.log(salt);

    conn.query('SELECT * FROM User WHERE UserId=?', [nic], function (err, result, fields) {
        if (err) throw err;
        else if (result && result.length)
            res.json('User already existed')
        else {
            conn.query("INSERT INTO UserLogin (UserId, PasswordHash, Salt) VALUES (?,?,?)", [uid, password, salt], function (err, result) {
                if (err) throw err;
                else {
                    console.log("Number of records inserted: " + result.affectedRows);
                    conn.query("INSERT INTO User (UserId, Name, NICPP, Mobile) VALUES (?,?,?,?)", [uid, name, nic, mobile, password, salt], function(err,result){
                        if (err) throw err;    
                        console.log("Number of records inserted: " + result.affectedRows);
                        res.json('Registration is succesfull');
                    });
                }
            });
        }
    });
});

//Login API
app.post('/login/', (req, res, next) => {
    var post_data = req.body;
    var nic = post_data.nic;
    var user_password = post_data.password;

    console.log(nic);
    console.log(user_password);

    conn.query('SELECT * FROM User WHERE NICPP=?', [nic], function (err, result) {
        if (err) throw err;
        else if (result && result.length){
            console.log(result[0].UserId);
            conn.query("SELECT * FROM UserLogin WHERE UserId=?", [result[0].UserId], function (err, result) {
                if (err) throw err;
                else if (result && result.length) {
                    console.log(result[0].Salt);
                    console.log(result[0].PasswordHash);
                    var salt = result[0].Salt;
                    var encrypted_password = result[0].PasswordHash;
                    var hashed_password = checkHashPassword(user_password, salt).passwordHash;
                    console.log(hashed_password);
                    if (encrypted_password == hashed_password) {
                        res.json('User does exists!');
                        res.end(JSON.stringify(result[0]));
                    } else {
                        res.json('User does not exists!');
                    }
                }
            });
        }
    });
});

//Start server
app.listen(7700, () => {
    console.log('Arogya server running on port 7700');
    conn.connect(function (err) {
        if (err) throw err;
        console.log('Database Connected');
    });
})