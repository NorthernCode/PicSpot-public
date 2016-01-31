var express = require('express');
var path = require('path');
var filesystem = require('fs-extra');
var router = express.Router();

var allowed = ['.jpg','.png','.gif','.bmp'];


router.post('/', function (req, res, next) {

        var filestream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            if(allowed.indexOf(path.extname(filename)) != -1){

                filename = createFilename(filename);
                console.log("Uploading: " + filename);

                //Path where image will be uploaded
                filestream = filesystem.createWriteStream(__dirname + '/../public/images/' + filename);
                file.pipe(filestream);
                filestream.on('close', function () {    
                    console.log("Upload Finished of " + filename);              
                    res.redirect('../image/' + filename);           //where to go next
                });
            }else{
                res.render('index', { title: 'PicSpot' });
            }
        });
});

function createFilename(filename){
    //create a random six char long string with original file extension
    var chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    var newName = '';
    for(var i=0; i < 6; i++) newName += chars[Math.floor(Math.random() * chars.length)];
    return newName + '.' + filename.split('.').pop();
}

module.exports = router;