module.exports = function apiRoutes(app) {
  const fs = require("fs");
  const path = require("path");
  let friends = require("./../data/friends.js");

  app.get("/api/friends", (req, res) => {
    return res.json(friends);
  });

  app.post("/api/friends", (req, res) => {
    let totalDifference;
    let differenceArray = [];
    let newfriend = req.body;
    console.log(newfriend);

  //  friends = friends.reduce((carry, friend) => {
  //   let val = newfriend.scores.reduce(
  //               (carry, currentScore, i) => carry + Math.abs(friend.scores[i] - currentScore), 
  //               0
  //             );
    
  //   return val < carry.val ? { target: friend, val: val} : carry;
  //  }, 100)

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

    friends.push(newfriend);

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