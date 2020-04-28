const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

var app = express();
app.use(bodyParser.json()); //Accept JSON params
app.use(bodyParser.urlencoded({
    extended: true //Accept URL encoded params
}));

var cors = require('cors')

app.use(cors()) 

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Arogya..." });
});

var routes = require("./app/routes/routes.js");
routes(app);

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../frontend/build')));
    
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, '../frontend/build', 'index.html'));
  });
}

// set port, listen for requests
const PORT = process.env.PORT || 7800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
