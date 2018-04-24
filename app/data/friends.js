const fs = require("fs");

let raw = fs.readFileSync("../friender/app/data/friends.json");
let friends = JSON.parse(raw);

module.exports = friends;