function apiRoutes(app) {
  const express = require("express");
  const bodyParser = require("body-parser");
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

    res.json(friends[match]);
  });
}

module.exports = apiRoutes;