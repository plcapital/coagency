var bcrypt = require('bcrypt');

exports.login = function (modelProvider) {
    return function (req, res) {
        authenticate(req.body.username, req.body.password, modelProvider, function (err, user) {
            if (user) {
                // Regenerate session when signing in to prevent fixation
                req.session.regenerate(function () {
                    // Store the user's primary key in the session store to be retrieved, or in this case the entire user
                    // object
                    req.session.user = user;

                    res.location("/")
                    res.redirect("/")
                });
            } else {
                res.render('login', {
                    "errorMsg": "Authentication faile because of - " + err
                });
            }
        });
    }
};

exports.loginPage = function (req, res) {
    res.render('login');
};

exports.logoutPage = function (req, res) {
    req.session.destroy();

    res.render('login', {
        "infoMsg": "You are now logged out."
    });
};

function authenticate(name, pass, modelProvider, fn) {
    if (!module.parent) {
        console.log('authenticating %s:%s', name, pass);
    }

    var UserModel = modelProvider.getModelByName('user');

    UserModel.findOne({"username": name}, function (err, user) {
        if (err) {
            // TODO handle err
            console.log(err);
        }
        
        if (!user) {
            return fn(new Error('cannot find user'));
        }

        bcrypt.compare(pass, user.hash, function(err, res) {
            if (!res) {
                fn(new Error('invalid password'));    
            } else {
                fn(null, user);
            }
        });
    });
}
