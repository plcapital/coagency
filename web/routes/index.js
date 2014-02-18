/*
 * GET home page.
 */

exports.index = function (req, res) {
    res.render('index', {
        title: 'Agents',
        "loggedInUser": req.session.user
    });
};

exports.userlist = function (modelProvider) {
    return function (req, res) {
        var userModel = modelProvider.getModelByName('users');

        userModel.find(function (err, users) {
            if (err) {
                // TODO handle err
                console.log(err);
            } else {
                res.render('userlist', {
                    "userlist": users
                });
            }
        });
    }
}

exports.posts = function (modelProvider) {
    return function (req, res) {
        var postModel = modelProvider.getModelByName('posts');

        postModel.find(function (err, posts) {
            if (err) {
                // TODO handle err
                console.log(err);
            } else {
                res.render('posts', {
                    "postlist": posts
                });
            }
        });
    }
}

exports.newpost = function (req, res) {
    res.render('newpost', { title: 'Add New Post' });
}

exports.createpost = function (modelProvider) {
    return function (req, res) {

        // Get our form values. These rely on the "name" attributes
        var postTitle = req.body.postTitle;
        var postDescription = req.body.postDescription;

        var postModel = modelProvider.getModelByName('posts');

        // Submit to the DB
        var post = new postModel({
            title: postTitle,
            description: postDescription
        });
        post.save(function (err) {
            if (err) {
                // If it failed, return error
                res.send("There was a problem adding the information to the database.");
            } else {
                // If it worked, set the header so the address bar doesn't still say /adduser
                res.location("userlist")
                // And forward to success page
                res.redirect("userlist")
            }
        })
    }
}
