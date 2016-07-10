var bcrypt = require('bcrypt');
var common = require('../utils/common');

exports.createUserPage = function (req, res) {
    res.render('user/createUser', {
        user: req.session.user
    });
};

exports.createUser = function (modelProvider) {
    return function (req, res) {

        // Get our form values. These rely on the "name" attributes
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        var UserModel = modelProvider.getModelByName('user');

        UserModel.findOne({$or: [{username: username}, {email: email}]}, function (err, existingUser) {
            if (err) {
                res.send(err);
            } else if (existingUser != null) {
                res.send('The specified username and/or email has already been used, these must be unique.');
            } else {
                bcrypt.genSalt(10, function(err, salt) {
                    bcrypt.hash(password, salt, function(err, hash) {
                        // Submit to the DB
                        var user = new UserModel({
                            username: username,
                            email: email,
                            hash: hash
                        });

                        user.save(function (err) {
                            if (err) {
                                // If it failed, return error
                                res.send('There was a problem adding the information to the database.');
                            } else {
                                res.location('/listUsers');
                                res.redirect('/listUsers');
                            }
                        })
                    });
                });
            }
        });
    }
};

exports.listUsersPage = function (modelProvider) {
    return function (req, res) {
        if (common.redirectToIndexIfNotLoggedIn(req, res)) {
            return;
        }

        var userModel = modelProvider.getModelByName('user');

        userModel.find(function (err, users) {
            if (err) {
                // TODO handle err
                console.log(err);
            } else {
                res.render('user/listUsers', {
                    user: req.session.user,
                    users: users
                });
            }
        });
    }
};

exports.passwordResetPage = function(req, res) {
    res.render('user/passwordReset');
};
