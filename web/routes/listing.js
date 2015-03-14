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
                title: 'Add New Listing', errors: errors, groupId: req.body.groupId
            });
            return;
        }

        var listingUserId = req.session.user._id;
        var listingGroupId = req.body.groupId;
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
    if (common.redirectToIndexIfNotLoggedIn(req, res)) {
        return;
    }

    // Check to see this came from a group page
    if (!req.query.groupId) {
        res.location('/');
        res.redirect('/');
    } else {
        res.render('listing/createListing', {
            title: 'Add New Listing', groupId: req.query.groupId
        });
    }
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

                res.render('listing/viewListing', {
                    listing: listing, comments: comments
                });
            })
        })
    }
}
