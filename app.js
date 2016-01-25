var express = require('express');
var busboy = require('connect-busboy');
var path = require('path');
var filesystem = require('fs-extra');
var app = express();

app.use(express.static('public'));
app.use(busboy());


app.get('/m', function (req, res) {
  res.send('Hello Express World!');
});

app.route('/upload')
  .post(function (req, res, next) {

        var filestream;
        req.pipe(req.busboy);
        req.busboy.on('file', function (fieldname, file, filename) {
            console.log("Uploading: " + filename);

            //Path where image will be uploaded
            filestream = filesystem.createWriteStream(__dirname + '/img/' + filename);
            file.pipe(filestream);
            filestream.on('close', function () {    
                console.log("Upload Finished of " + filename);              
                res.redirect('back');           //where to go next
            });
        });
});

app.listen(3000, function () {
  console.log('Listening on port 3000!');
});