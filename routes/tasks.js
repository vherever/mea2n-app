var express = require('express');
var router = express.Router();
var mongojs = require('mongojs');
var user = {
    login: process.env.DB_LOGIN,
    password: process.env.DB_PASSWORD
};
var db = mongojs('mongodb://' + user.login + ':' + user.password + '@ds023428.mlab.com:23428/mean2-tasklist', ['tasks']);

router.get('/tasks', function (req, res, next) {
    db.tasks.find(function (err, tasks) {
        if(err) {
            res.send(err);
        }
        res.json(tasks);
    });
});

router.get('/task/:id', function (req, res, next) {
    db.tasks.findOne({_id: mongojs.ObjectID(req.params.id)}, function (err, task) {
        if(err) {
            res.send(err);
        }
        res.json(task);
    });
});

router.post('/task', function (req, res, next) {
    var task = req.body;
    if(!task.title || !(task.isDone + '')) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.save(task, function (err, task) {
            if(err) {
                res.send(err);
            }
            res.json(task);
        })
    }
});

router.delete('/task/:id', function (req, res, next) {
    db.tasks.remove({_id: mongojs.ObjectID(req.params.id)}, function (err, task) {
        if(err) {
            res.send(err);
        }
        res.json(task);
    });
});

router.put('/task/:id', function (req, res, next) {
    var task = req.body;
    var updTask = {};

    if(task.isDone) {
        updTask.isDone = task.isDone;
    }

    if(task.title) {
        updTask.title = task.title;
    }

    if(!updTask) {
        res.status(400);
        res.json({
            "error": "Bad Data"
        });
    } else {
        db.tasks.update({_id: mongojs.ObjectID(req.params.id)}, updTask, {}, function (err, task) {
            if(err) {
                res.send(err);
            }
            res.json(task);
        });
    }
});

module.exports = router;