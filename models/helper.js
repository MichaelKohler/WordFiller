'use strict'

var archiver = require('archiver');
var AdmZip = require('adm-zip');
var fs = require('fs');

// TODO: async?
exports.deleteFolderRecursive = function(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                deleteFolderRecursive(curPath);
            }
            else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

exports.rezipDocument = function(filepath, tempFolder) {
    var output = fs.createWriteStream(filepath);
    var archive = archiver('zip');
    archive.on('error', function(err) {
        throw err;
    });
    archive.pipe(output);
    archive.bulk([
        { expand: true, cwd: tempFolder + '/', src: ['**'], dest: '' }
    ]);
    archive.finalize();
};

exports.extractZip = function(filepath) {
    // create temp folder
    var tempFolder = generateUUID();
    fs.mkdirSync(tempFolder);
    // unzip the zip to temp folder
    var zip = new AdmZip(filepath);
    zip.extractAllTo(tempFolder);
    return tempFolder;
};

var generateUUID = function() {
    // from http://stackoverflow.com/a/2117523
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
        return v.toString(16);
    });
}