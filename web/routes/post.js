var common = require('../utils/common');

exports.createPost = function (modelProvider) {
    return function (req, res) {
        var postTitle = req.body.postTitle;
        var postDescription = req.body.postDescription;
        var groupId = req.body.postGroupId;

        var PostModel = modelProvider.getModelByName('post');

        var post = new PostModel({
            title: postTitle,
            description: postDescription,
            groupId: groupId
        });

        post.save(function (err) {
            if (err) {
                // If it failed, return error
                res.send('There was a problem adding the information to the database.');
            } else {
                res.location('viewGroup?groupId=' + groupId);
                res.redirect('viewGroup?groupId=' + groupId);
            }
        })
    }
}

exports.createPostPage = function (req, res) {
    if (common.redirectToIndexIfNotLoggedIn(req, res)) {
        return;
    }

    // Check to see this came from 
    if (!req.query.groupId) {
        res.location('/');
        res.redirect('/');
    } else {
        res.render('listing/createPost', {
            title: 'Add New Post', groupId: req.query.groupId
        });
    }
}

exports.listPostsPage = function (modelProvider) {
    return function (req, res) {
        if (common.redirectToIndexIfNotLoggedIn(req, res)) {
            return;
        }

        var postModel = modelProvider.getModelByName('post');

        postModel.find(function (err, posts) {
            if (err) {
                // TODO handle err
                console.log(err);
            } else {
                res.render('listing/listPosts', {
                    posts: posts
                });
            }
        });
    }
}

exports.viewPostPage = function (modelProvider, id) {
    return function (req, res) {
        if (common.redirectToIndexIfNotLoggedIn(req, res)) {
            return;
        }

        var PostModel = modelProvider.getModelByName('post');

        PostModel.findById(id, function (err, post) {
            if (err) {
                res.send('find some post failed: ' + err);
                return;
            }

            // TODO ...
        })
    }
}
