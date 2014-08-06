/*
 * GET home page.
 */

exports.indexPage = function (req, res) {
    res.render('index', {
        title: 'Coagency',
        "loggedInUser": req.session.user
    });
};
