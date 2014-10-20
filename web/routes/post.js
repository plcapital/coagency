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
    if (!req.session.user || !req.query.groupId) {
        // TODO handle error
        console.log('Not logged in, or not in a group');
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
