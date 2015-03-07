exports.redirectToIndexIfNotLoggedIn = function(req, res) {
    if (!req.session.user) {
        res.location('/');
        res.redirect('/');

        return true;
    }

    return false;
}
