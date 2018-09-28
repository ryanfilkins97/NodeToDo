const express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
var Task = require('./schemas/task');

router.get('/', function(req, res){
    Task.find(function(err, response){
        res.render('list', {
            tasks: response,
            moment: require('moment')
        });
    });
});

router.get('/addTask', function(req, res){
    res.render('newTask');
});

router.post('/addTask', function(req, res){
    var newTask = req.body;

    if(!newTask.name || !newTask.desc){
        res.render('newTask', {
            error: "Task must have a name and a description"
        })
    } else {
        var task = new Task({
            name: newTask.name,
            desc: newTask.desc,
            created: Date.now()
        });

        task.save();

        res.redirect('/');
    }
});

router.get('/deleteTask/:id', function(req, res){
    console.log("Deleted: " + req.params.id);
    Task.findByIdAndRemove(req.params.id, function(err, response){
        if(err){
            console.log("Couldn't delete: " + err);
        }
    });

    res.redirect('/');
})

module.exports = router;