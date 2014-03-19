'use strict';

exports.fillDocumentWithProperties = function (req, res) {
    var locals = { };
    res.render('document_overview', locals);
};

exports.documentOverview = function (req, res) {
    var locals = { };
    res.render('document_overview', locals);
};