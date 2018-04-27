// file packaged as a function for export
module.exports = function apiRoutes(app) {
  // variable declarations for required packages and imported files
  const fs = require("fs");
  const path = require("path");
  let friends = require("./../data/friends.json");

  // endpoint to display a JSON of all possible friends
  app.get("/api/friends", (req, res) => {
    return fs.readFile(path.join(__dirname, '../data/friends.json'), 'utf8', (err, data) => {
      if (err) throw err;
      let friendList = JSON.parse(data);
      res.json(friendList);
    });
  });

  // endpoint to handle survey results, handle compatibility logic, and update JSON of all possible friends
  app.post("/api/friends", (req, res) => {

    // variable to hold total difference between survey results
    let totalDifference;

    // array to store all of the total differences between a new user and existing users
    let differenceArray = [];

    // variable to hold the body of the user request (survey results)
    let newfriend = req.body;

    // iterate through all friends in the friends JSON array
    for (let i = 0; i < friends.length; i++) {

      // initialize total difference variable
      totalDifference = 0;

      // iterate through each score in the new friend's scores array, get the absolute value of the difference between that score and the corresponding score of each existing friend, and update the total difference
      for (let j = 0; j < newfriend.scores.length; j++) {
        totalDifference += Math.abs(friends[i].scores[j] - newfriend.scores[j]);
      }

      // push the total difference for that friend into the array of total differences
      differenceArray.push(totalDifference);
    }

    // variable to find the lowest number in the array of total differences
    let match = differenceArray.indexOf(Math.min(...differenceArray));

    // return the friend object with the lowest number to be displayed as a match
    res.json(friends[match]);

    // read the JSON file with existing friends
    fs.readFile(path.join(__dirname, '../data/friends.json'), 'utf8', (err, data) => {
      if (err) throw err;
      friends = JSON.parse(data);

      // push the new friend object into the JSON array of existing friends
      friends.push(newfriend);

      // overwrite the JSON to include the existing friends plus the new friend
      fs.writeFile(path.join(__dirname, '../data/friends.json'), JSON.stringify(friends, null, 2), (err) => {
        if (err) throw err;
      });
    });
  });
}