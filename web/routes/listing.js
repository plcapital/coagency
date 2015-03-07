var common = require('../utils/common');

exports.createListing = function (modelProvider) {
    return function (req, res) {
        var listingTitle = req.body.listingTitle;
        var listingDescription = req.body.listingDescription;
        var listingGroupId = req.body.listingGroupId;

        var ListingModel = modelProvider.getModelByName('listing');

        var Listing = new ListingModel({
            title: listingTitle,
            description: listingDescription,
            groupId: listingGroupId
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

exports.viewListingPage = function (modelProvider, id) {
    return function (req, res) {
        if (common.redirectToIndexIfNotLoggedIn(req, res)) {
            return;
        }

        var ListingModel = modelProvider.getModelByName('listing');

        ListingModel.findById(id, function (err, listing) {
            if (err) {
                res.send('find some listing failed: ' + err);
                return;
            }

            // TODO ...
        })
    }
}
