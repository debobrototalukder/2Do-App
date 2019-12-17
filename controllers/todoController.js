var Todo = require('../models/list'); // Database model

function getTodos(res) {
    Todo.find(function (err, todos) {

        if (err) {
            res.send(err); // Error handling
        }

        res.json(todos);
    });
};

module.exports = function (app) {

    app.get('/api/todos', function (req, res) {
        console.log("Entered get")
        getTodos(res); // Call function todos that returns all data from database
    });

    app.post('/api/todos', function (req, res) {
        Todo.create({  // Creating a new task
            text: req.body.text,
            done: false
        }, function (err, todo) {
            if (err)
                res.send(err);
            getTodos(res); // If no error then show all tasks after adding
        });

    });

    app.delete('/api/todos/:todo_id', function (req, res) {
        Todo.remove({ // Removing an exising task
            _id: req.params.todo_id
        }, function (err, todo) {
            if (err)
                res.send(err);

            getTodos(res);
        });
    });

    app.get('*', function (req, res) {
        console.log("Mainpage")
        res.sendFile( +__dirname + '/index.html'); // Main landing page for base app url
    });
};
