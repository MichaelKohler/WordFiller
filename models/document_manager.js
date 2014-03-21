'use strict'

var fs = require('fs');
var xml2js = require('xml2js');

exports.processDocument = function(tempFolder, documentPath) {
    var parser = new xml2js.Parser();
    fs.readFile(tempFolder + '/word/document.xml', function(error, data) {
        if (error) {
            throw error;
        }
        parser.parseString(data, function (err, result) {
            // TODO: HERE WE CAN MODIFY THE XML FILES!!!
            console.dir(result);
        });
    });
};