module.exports = function apiRoutes(app) {
  const fs = require("fs");
  const path = require("path");
  let friends = require("./../data/friends.json");

  app.get("/api/friends", (req, res) => {
    // friends(friends => res.json(friends));
    return fs.readFile(path.join(__dirname, '../data/friends.json'), 'utf8', (err, data) => {
      if (err) throw err;
      let friendList = JSON.parse(data);
      res.json(friendList);
    });
  });

  app.post("/api/friends", (req, res) => {
    let totalDifference;
    let differenceArray = [];
    let newfriend = req.body;
    console.log(newfriend);

    for (let i = 0; i < friends.length; i++) {
      totalDifference = 0;
      for (let j = 0; j < newfriend.scores.length; j++) {
        totalDifference += Math.abs(friends[i].scores[j] - newfriend.scores[j]);
      }
      differenceArray.push(totalDifference);
    }

    console.log(differenceArray);
    let match = differenceArray.indexOf(Math.min(...differenceArray));
    console.log(match);

    // friends.push(newfriend);

    fs.readFile(path.join(__dirname, '../data/friends.json'), 'utf8', (err, data) => {
      if (err) throw err;
      let json = JSON.parse(data);
      json.push(newfriend);

      fs.writeFile(path.join(__dirname, '../data/friends.json'), JSON.stringify(json, null, 2), (err) => {
        if (err) throw err;
      });
    });

    res.json(friends[match]);
  });
}