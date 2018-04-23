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

        friends.forEach(friend => {
            totalDifference = 0;
            friend.scores.forEach(friendScore => {
                newfriend.scores.forEach(score => {
                    totalDifference += Math.abs(friendScore - score);
                });
            });
            differenceArray.push(totalDifference);
        });




        console.log(differenceArray);
        let match = differenceArray.indexOf(Math.min(...differenceArray));
        console.log(match);

        friends.push(newfriend);

        res.json(friends[match]);
    });
}

module.exports = apiRoutes;