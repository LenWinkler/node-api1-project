// implement your API here
const express = require('express');

const server = express();

const users = require('./data/db');

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

server.get

const port = 8000;
server.listen(port, () => console.log('\nAPI on port 8000\n'));