'use strict';

var AdmZip = require('adm-zip');
var fs = require('fs');

var templatePath = 'test.docx';
var tempFolder = '';
var zipTemplatePath = '';

exports.fillDocumentWithProperties = function (req, res) {
    var locals = { };

    // TODO: refactor method with promises
    // TODO: this would lead to better structure and not
    // TODO: so long method

    // rename word document to zip
    zipTemplatePath = templatePath.replace('.docx', '.zip')
    fs.rename(templatePath, zipTemplatePath, function(errorToZIP) {
        if (errorToZIP) {
            console.log(errorToZIP.message);
            locals.error = errorToZIP.message;
            res.render('index', locals);
        }
        else {
            // create temp folder
            tempFolder = 'foooo';  // TODO: create GUID
            fs.mkdirSync(tempFolder);

            // unzip document
            var zip = new AdmZip('./test.zip');
            zip.extractAllTo(tempFolder, true);
            locals.success = 'SUCCESS!!';

            // rename file back to word document
            fs.rename(zipTemplatePath, templatePath, function(errorToWord) {
                if (errorToWord) {
                    console.log(errorToWord.message);
                    locals.error = errorToWord.message;
                }
                __cleanup();
                res.render('index', locals);
            });
        }
    });
};

var __cleanup = function() {
    __deleteFolderRecursive(tempFolder);
};

// TODO: async?
var __deleteFolderRecursive = function(path) {
    if (fs.existsSync(path)) {
        fs.readdirSync(path).forEach(function(file, index) {
            var curPath = path + "/" + file;
            if (fs.lstatSync(curPath).isDirectory()) {
                __deleteFolderRecursive(curPath);
            }
            else {
                fs.unlinkSync(curPath);
            }
        });
        fs.rmdirSync(path);
    }
};

exports.documentOverview = function (req, res) {
    var locals = { };
    res.render('document_overview', locals);
};