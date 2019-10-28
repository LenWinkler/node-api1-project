// implement your API here
const express = require('express');

const server = express();

const users = require('./data/db');

server.use(express.json());

server.post('/api/users', (req, res) => {
    const newUser = req.body;

    if(!newUser.name || !newUser.bio) {
        res.status(400).json({ errorMessage: "Please provide both name and bio for the user." })
    } else {

    users.insert(newUser)
        .then(newUsr => {
            console.log(newUser)
            res.status(201).json(newUsr)
        })
        .catch(err => {
            console.log('user add error', err)
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
    }
})

server.get('/api/users', (req, res) => {
    users.find()
        .then(users => {
            res.status(200).json(users)
        })
        .catch(err => {
            console.log('error', err);
            res.status(500).json({ error: "The users information could not be retrieved." })
        })
});



const port = 8000;
server.listen(port, () => console.log('\nAPI on port 8000\n'));