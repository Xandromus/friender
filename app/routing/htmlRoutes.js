module.exports = function htmlRoutes(app) {
    const path = require("path");

    app.GET("/survey", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/survey.html"));
      });

      app.GET("/", (req, res) => {
        res.sendFile(path.join(__dirname, "/../public/home.html"));
      });
}