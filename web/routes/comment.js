exports.createComment = function (modelProvider) {
    return function (req, res) {
        req.checkBody('text', 'comment text is required').notEmpty();

        var listingId = req.body.listingId;

        var errors = req.validationErrors(); 
        if (errors) {
            res.location('/viewListing?listingId=' + listingId);
            res.redirect('/viewListing?listingId=' + listingId);
            return;
        }

        var commentUserId = req.session.user._id;
        var commentText = req.body.text;
        var commentCreateDate = '';

        var CommentModel = modelProvider.getModelByName('comment');

        var Comment = new CommentModel({
            userId: commentUserId,
            listingId: listingId,
            text: commentText,
            creationDate: commentCreateDate
        });

        Comment.save(function (err) {
            if (err) {
                // If it failed, return error
                res.send('There was a problem adding the information to the database.');
            } else {
                res.location('/viewListing?listingId=' + listingId);
                res.redirect('/viewListing?listingId=' + listingId);
            }
        })
    }
};
