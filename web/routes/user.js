var bcrypt = require('bcrypt');

exports.createUserPage = function (req, res) {
    res.render('user/createUser');
}

exports.createUser = function (modelProvider) {
    return function (req, res) {

        // Get our form values. These rely on the "name" attributes
        var username = req.body.username;
        var email = req.body.email;
        var password = req.body.password;

        var UserModel = modelProvider.getModelByName('user');

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
}

exports.listUsersPage = function (modelProvider) {
    return function (req, res) {
        var userModel = modelProvider.getModelByName('user');

        userModel.find(function (err, users) {
            if (err) {
                // TODO handle err
                console.log(err);
            } else {
                res.render('user/listUsers', {
                    users: users
                });
            }
        });
    }
}
