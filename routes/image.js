var express = require('express');
var mysql = require('mysql');
var router = express.Router();

var db = require('../bin/db');

/* GET home page. */
router.get('/:img', function(req, res, next) {
    db.query('SELECT name, comment FROM picspot_comments WHERE url="' + req.params.img + '";', function(err, result) {
        if (err) throw err;
        console.log(result);
        res.render('image', { imgUrl: '../images/' + req.params.img, comments: result });
    });
});

router.post('/:img', function(req, res, next) {
    console.log(req.body);
    db.query('INSERT INTO picspot_comments SET ?', req.body, function(err, result) {
        if (err) throw err;
    });
    res.render('comment', { title: 'PicSpot-Comment' });
});

module.exports = router;
