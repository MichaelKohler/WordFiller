'use strict';

var fs = require('fs');
var documentManager = require('../models/document_manager.js');
var helper = require('../models/helper.js');

exports.fillDocumentWithProperties = function (req, res) {
    var locals = { };

    // rename word document to zip
    var templatePath = 'test.docx';
    var zippedTemplatePath = 'test_temp.zip';
    fs.rename(templatePath, zippedTemplatePath, function(errorToZIP) {
        if (errorToZIP) {
            locals.error = errorToZIP.message;
            res.render('index', locals);
        }
        else {
            var tempFolder = helper.extractZip(zippedTemplatePath);

            var finalDocumentPath = 'test_new.docx';
            documentManager.processDocument(finalDocumentPath);

            var zippedFinalTemplatePath = 'test_new.zip';
            helper.rezipDocument(zippedFinalTemplatePath, tempFolder);

            // rename new zip file back to be a word document
            fs.rename(zippedFinalTemplatePath, finalDocumentPath, function(errorToWord) {
                if (errorToWord) {
                    locals.error = errorToWord.message;
                }
                else {
                    locals.success = 'SUCCESS!!';
                }

                //helper.deleteFolderRecursive(tempFolder); // TODO: figure out file handling of archiver!!
                fs.unlinkSync(zippedTemplatePath);
                res.render('index', locals);
            });
        }
    });
};

exports.documentOverview = function (req, res) {
    var locals = { };
    res.render('document_overview', locals);
};