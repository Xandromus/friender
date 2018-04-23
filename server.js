const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

// process.env.PWD = process.cwd();

// Sets up the Express App
// =============================================================
const app = express();
const PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('app/public'));

// Routes
// =============================================================

let apiRoutes = require('./app/routing/apiRoutes.js')(app); 
let htmlRoutes = require('./app/routing/htmlRoutes.js')(app);

// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});