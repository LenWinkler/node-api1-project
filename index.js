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
});

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

server.get('/api/users/:id', (req, res) => {
    const id = req.params.id;

    users.findById(id)
        .then(user => {
            if(user === []) {
                res.status(404).json({ message: "The user with the specified ID does not exist" })
            } else {
            res.json(user)
        }})
        .catch(err => {
            console.log('find by id error', err);
            res.status(500).json({ error: "The user information could not be retrieved" })
        })
});

server.delete('/api/users/:id', (req, res) => {
    const id = req.params.id;

    users.remove(id)
        .then(del => {
            if(del > 0) {
                res.json({ message: "User successfully removed" })
            } else {
                res.status(404).json({ message: "The user with the specified id does not exist" })
            }
        })
        .catch(err => {
            console.log('delete error', err);
            res.status(500).json({ error: "User could not be removed" })
        })
});

server.put('/api/users/:id', (req, res) => {
    const id = req.params.id;
    const newInfo = req.body;

    users.update(id, newInfo)
        .then(updated => {
            if(updated === 0) {
                res.status(404).json({ message: "The user with the specified id does not exist" })
            } else if(!newInfo.name || !newInfo.bio) {
                res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
            } else {
                res.status(200).json(req.body)
            }
        })
        .catch(err => {
            console.log('update error', err);
            res.status(500).json({ error: "There was an error while saving the user to the database" })
        })
});


const port = 8000;
server.listen(port, () => console.log('\nAPI on port 8000\n'));