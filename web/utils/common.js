var redirectToIndex = function(req, res) {
    res.location('/');
    res.redirect('/');
}

var redirectToIndexIfNotLoggedIn = function(req, res) {
    if (!req.session.user) {
        redirectToIndex(req, res);
        return true;
    }

    return false;
}

module.exports = {
  redirectToIndex: redirectToIndex,
  redirectToIndexIfNotLoggedIn: redirectToIndexIfNotLoggedIn
}
