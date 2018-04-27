// variable declarations for required packages and imported files/functions
const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// sets up the Express app to serve static files
app.use(express.static(path.join(__dirname, '/app/public')));

// passes the Express app into the required routes
require('./app/routing/apiRoutes.js')(app);
require('./app/routing/htmlRoutes.js')(app);

// starts the server to begin listening
// =============================================================
app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});