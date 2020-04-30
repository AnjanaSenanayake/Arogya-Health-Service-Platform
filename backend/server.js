const express = require('express');
const bodyParser = require('body-parser');
var socket = require('socket.io');
const path = require('path');
//const Admin = require("./app/controllers/admin.controller.js");

var app = express();
app.set('port', process.env.PORT || 7800);
app.use(bodyParser.json()); //Accept JSON params
app.use(bodyParser.urlencoded({
  extended: true //Accept URL encoded params
}));

var cors = require('cors');
app.use(cors());

var routes = require("./app/routes/routes.js");
routes(app);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// set port, listen for requests
const PORT = process.env.PORT || 7800;
var server = app.listen(app.get('port'), () => {
  console.log(`Server is running on port ${PORT}.`);
});

var io = socket(server);
io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});
app.locals.io = io;