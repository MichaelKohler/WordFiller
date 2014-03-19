'use strict';

exports.index = function (req, res) {
    var locals = {user: req.session.user || ''};
    locals.pagetitle = 'WordFiller'
    res.render('index', locals);
};