var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var db = require('../bin/db');

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('comment', { title: 'PicSpot-Comment' });
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    db.query('INSERT INTO picspot_comments (name, comment) VALUES ("' + req.body.name +'", "' + req.body.comment +'");', function(err, rows, fields) {
        if (err) throw err;
    });
    res.render('comment', { title: 'PicSpot-Comment' });
});

module.exports = router;
