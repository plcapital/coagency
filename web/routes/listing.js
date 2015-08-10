var common = require('../utils/common');

exports.createListing = function (modelProvider) {
    return function (req, res) {
        req.checkBody('description', 'description is required').notEmpty();
        req.checkBody('location', 'location is required').notEmpty();
        req.checkBody('type', 'type is required').notEmpty();
        req.checkBody('category', 'category is required').notEmpty();
        req.checkBody('area', 'area is required').notEmpty();
        req.checkBody('price', 'price is required').notEmpty();

        var errors = req.validationErrors(); 
        if (errors) {
            res.render('listing/createListing', {
                user: req.session.user,
                title: 'Add New Listing',
                errors: errors
            });
            return;
        }

        var listingUserId = req.session.user._id;
        var listingGroupId = req.session.group._id;
        var listingDescription = req.body.description;
        var listingLocation = req.body.location;
        var listingType = req.body.type;
        var listingCategory = req.body.category;
        var listingProperty = req.body.property;
        var listingArea = req.body.area;
        var listingMeasure = req.body.measure;
        var listingPrice = req.body.price;
        var listingBedrooms = req.body.bedrooms;
        var listingBathrooms = req.body.bathrooms;
        var listingTenure = req.body.tenure;

        var ListingModel = modelProvider.getModelByName('listing');

        var Listing = new ListingModel({
            userId: listingUserId,
            groupId: listingGroupId,
            description: listingDescription,
            location: listingLocation,
            type: listingType,
            category: listingCategory,
            property: listingProperty,
            area: listingArea,
            measure: listingMeasure,
            price: listingPrice,
            bedrooms: listingBedrooms,
            bathrooms: listingBathrooms,
            tenure: listingTenure
        });

        Listing.save(function (err) {
            if (err) {
                // If it failed, return error
                res.send('There was a problem adding the information to the database.');
            } else {
                res.location('viewGroup?groupId=' + listingGroupId);
                res.redirect('viewGroup?groupId=' + listingGroupId);
            }
        })
    }
}

exports.createListingPage = function (req, res) {
    if (common.redirectToIndexIfNoGroupContext(req, res)) {
        return;
    }

    res.render('listing/createListing', {
        user: req.session.user,
        title: 'Add New Listing'
    });
}

exports.listListingsPage = function (modelProvider) {
    return function (req, res) {
        if (common.redirectToIndexIfNotLoggedIn(req, res)) {
            return;
        }

        var listingModel = modelProvider.getModelByName('listing');

        listingModel.find(function (err, listings) {
            if (err) {
                // TODO handle err
                console.log(err);
            } else {
                res.render('listing/listListings', {
                    user: req.session.user,
                    listings: listings
                });
            }
        });
    }
}


exports.myListingsPage = function (modelProvider) {
    return function (req, res) {
        if (common.redirectToIndexIfNotLoggedIn(req, res)) {
            return;
        }

        var listingModel = modelProvider.getModelByName('listing');

        listingModel.find({ userId: req.session.user._id }, function (err, listings) {
            if (err) {
                // TODO handle err
                console.log(err);
            } else {
                res.render('listing/listListings', {
                    user: req.session.user,
                    listings: listings
                });
            }
        });
    }
}

exports.searchListings = function (modelProvider) {
    return function (req, res) {
        var listingModel = modelProvider.getModelByName('listing');

        listingModel.find({ description: new RegExp(req.body.query) }, function (err, listings) {
            if (err) {
                // TODO handle err
                console.log(err);
            } else {
                res.render('listing/listListings', {
                    user: req.session.user,
                    listings: listings
                });
            }
        });
    }
}

exports.viewListingPage = function (modelProvider) {
    return function (req, res) {
        if (common.redirectToIndexIfNotLoggedIn(req, res)) {
            return;
        }

        var listingId = req.query.listingId;
        if (!listingId) {
            common.redirectToIndex(req, res);
            return;
        }

        var ListingModel = modelProvider.getModelByName('listing');

        ListingModel.findById(listingId, function (err, listing) {
            if (err) {
                res.send('find some listing failed: ' + err);
                return;
            }

            var CommentModel = modelProvider.getModelByName('comment');
            CommentModel.find({ listingId: listingId }, function (err, comments) {
                if (err) {
                    res.send('Failed to find comments because of: ' + err);
                    return;
                }

                var userIds = [];

                for (var i = 0; i < comments.length; ++i) {
                    if (userIds.indexOf(comments[i].userId) === -1) {
                        userIds.push(comments[i].userId);
                    }
                }

                var UserModel = modelProvider.getModelByName('user');
                UserModel.find({ _id: { $in: userIds }}, function (err, users) {
                    if (err) {
                        res.send('Failed to find users for [' + userIds + ']\n' + err);
                        return;
                    }

                    for (var i = 0; i < comments.length; ++i) {
                        var comment = comments[i];
                        for (var i2 = 0; i2 < users.length; ++i2) {
                            var user = users[i2];
                            if (comment.userId === user._id.toString()) {
                                comment.userId = user.username;
                                console.log('Modified: ' + comment);
                                break;
                            }
                        }

                    }

                    console.log(comments);

                    res.render('listing/viewListing', {
                        user: req.session.user,
                        listing: listing,
                        comments: comments
                    });
                });

                // TODO error, something went wrong here!
            });
        });
    }
}
