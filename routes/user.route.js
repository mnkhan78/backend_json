const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

//to get all the users...

router.get("/", (req, res) => {
    // const filepath = path.join(__dirname, "../data/users.json");

    const filepath = path.join(__dirname, "..", process.env.DATA_FILE);

    fs.readFile(filepath, "utf-8", (err, data) => {
        if(err) {
            return res.status(500).json({message: "Failed to read data"});
        }

        res.json(JSON.parse(data));
    });
});

module.exports = router