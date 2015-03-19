exports.indexPage = function (req, res) {
    res.render('index', {
        title: 'Coagency',
        user: req.session.user
    });
};
