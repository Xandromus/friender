const fs = require("fs");
const path = require("path");
let raw = fs.readFileSync(path.join(__dirname, "friends.json"));
let friends = JSON.parse(raw);

module.exports = friends;