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

// to ADD a new User

router.post("/", (req, res) => {
    const filepath = path.join(__dirname, "..", process.env.DATA_FILE);

    const newUser = req.body; // new users details

    fs.readFile(filepath, "utf8", (err, data) => {
        if(err) {
            return res.status(500).json({message: "Failed to read data from database"});
        }

        let users = JSON.parse(data); //'users' has all the data whatever present at the 'filepath' i.e database
        
        //id generation for new users
        newUser.id = users.length ? users[users.length - 1].id + 1 : 1;

        users.push(newUser); //new user added

        //updating the existing database file after adding new user
        fs.writeFile(filepath, JSON.stringify(users, null, 2), (err) => {
            if(err) {
                return res.status(500).json({message: "failed to save data..."})
            }

            res.status(201).json({
                message: "user added successfully",
                user: newUser,
            })
        })
    })

})

module.exports = router