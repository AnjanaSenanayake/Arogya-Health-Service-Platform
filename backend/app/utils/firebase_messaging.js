var firebase = require("firebase");
var admin = require("firebase-admin");
var HashUtils = require("./password.utils.js");

var serviceAccount = require("./arogya-firebase-key.json");
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://arogya-62853.firebaseio.com"
});

firebase.initializeApp({
    databaseURL: "https://arogya-62853.firebaseio.com"
});

function broadcastEpidemicContactAlert(UID, epidemic) {
    var UIDhash = HashUtils.getMD5Hash(UID);
    var payload = {
        data: {
            'UIDHash': UIDhash,
            'Epidemic': epidemic
        }
    };

    var options = {
        priority: "high",
        timeToLive: 60 * 60 * 24 * 3
    };

    admin.messaging().sendToDevice('/topics/' + UIDhash, payload, options)
        .then(function (response) {
            console.log("Successfully broadcated the warning:", response);
        })
        .catch(function (error) {
            console.log("Error broadcating the alert:", error);
        });
}

module.exports = {
    broadcastEpidemicContactAlert
};