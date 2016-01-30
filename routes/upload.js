var express = require('express');
var path = require('path');
var filesystem = require('fs-extra');
var router = express.Router();



router.post('/', function (req, res, next) {

        var filestream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            if(path.extname(filename) == '.jpg'){
                console.log("Uploading: " + filename);

                //Path where image will be uploaded
                filestream = filesystem.createWriteStream(__dirname + '/../public/images/' + filename);
                file.pipe(filestream);
                filestream.on('close', function () {    
                    console.log("Upload Finished of " + filename);              
                    res.redirect('./images/' + filename);           //where to go next
                });
            }else{
                res.render('index', { title: 'PicSpot' });
            }
        });
});

module.exports = router;