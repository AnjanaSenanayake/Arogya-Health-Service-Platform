const express = require('express');
const bodyParser = require('body-parser');

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

// set port, listen for requests
const PORT = process.env.PORT || 7800;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
