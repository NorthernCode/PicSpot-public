var express = require('express');
var mysql = require('mysql');
var database = require('../bin/db');
var router = express.Router();

/* GET home page. */
router.get('/:img', function(req, res, next) {
    var path = require('fs');
    path.exists('./public/images/' + req.params.img, function(exists) { 
      if (exists) { 
        database.query('SELECT name, comment FROM picspot_comments WHERE url="' + req.params.img + '";', function(err, result) {
            if (err) throw err;
            res.render('image', { img: req.params.img, imgUrl: '../images/' + req.params.img, comments: result });
        });
      }else{
        var err = new Error('Not Found');
        err.status = 404;
        next(err);
      }
    }); 
    
});

router.post('/:img', function(req, res, next) {
    console.log(req.body);
    if(req.body.name != '' && req.body.comment != ''){
        database.query('INSERT INTO picspot_comments SET ?', req.body, function(err, result) {
            if (err) throw err;
        });
    }
    database.query('SELECT name, comment FROM picspot_comments WHERE url="' + req.params.img + '";', function(err, result) {
        if (err) throw err;
        console.log(result);
        res.render('image', { img: req.params.img, imgUrl: '../images/' + req.params.img, comments: result });
    });
});

module.exports = router;
