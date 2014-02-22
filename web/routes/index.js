/*
 * GET home page.
 */

exports.indexPage = function (req, res) {
    res.render('index', {
        title: 'Agents',
        "loggedInUser": req.session.user
    });
};
