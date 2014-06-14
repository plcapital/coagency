/**
 * Functions related to user details belong here.
 */

exports.listPage = function (modelProvider) {
    return function (req, res) {
        var userModel = modelProvider.getModelByName('user');

        userModel.find(function (err, users) {
            if (err) {
                // TODO handle err
                console.log(err);
            } else {
                res.render('users', {
                    "users": users
                });
            }
        });
    }
}

exports.createPage = function (req, res) {
    res.render('createUser', { title: 'Register' });
}

exports.create = function (modelProvider) {
    return function (req, res) {

        // Get our form values. These rely on the "name" attributes
        var username = req.body.username;
        var email = req.body.email;

        var UserModel = modelProvider.getModelByName('user');

        // Submit to the DB
        var user = new UserModel({
            username: username,
            email: email
        });
        user.save(function (err) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            } else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("users")
                // And forward to success page
                res.redirect("users")
            }
        })
    }
}
