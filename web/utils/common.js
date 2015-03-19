var redirectToIndex = function(req, res) {
    res.location('/');
    res.redirect('/');
}

var redirectToIndexIfNoGroupContext = function(req, res) {
    if (!req.session.group) {
        redirectToIndex(req, res);
        return true;
    }

    return false;
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
  redirectToIndexIfNoGroupContext: redirectToIndexIfNoGroupContext,
  redirectToIndexIfNotLoggedIn: redirectToIndexIfNotLoggedIn
}
