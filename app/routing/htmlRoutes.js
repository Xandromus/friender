// file packaged as a function for export
module.exports = function htmlRoutes(app) {
  // variable declaration for required package
  const path = require("path");

  // GET route to survey page
  app.get("/survey", (req, res) => {
    res.sendFile(path.join(__dirname, "/../public/survey.html"));
  });

  // default catch-all route to home page
  app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "/../public/home.html"));
  });
}