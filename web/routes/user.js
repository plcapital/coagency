/**
 * Functions related to user details belong here.
 */

exports.listPage = function (modelProvider) {
    return function (req, res) {
        var userModel = modelProvider.getModelByName('users');

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