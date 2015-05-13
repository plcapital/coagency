var common = require('../utils/common');

exports.listLocationPage = function (modelProvider) {
    return function (req, res) {
        if (common.redirectToIndexIfNotLoggedIn(req, res)) {
            return;
        }

        var locationModel = modelProvider.getModelByName('location');

        locationModel.find(function (err, locations) {
            if (err) {
                // TODO handle err
                console.log(err);
            } else {
                res.render('location/listLocations', {
                    user: req.session.user,
                    locations: locations
                });
            }
        });
    }
}


exports.viewLocationPage = function (modelProvider) {
    return function (req, res) {
        if (common.redirectToIndexIfNotLoggedIn(req, res)) {
            return;
        }

        var listingId = req.query.listingId;
        if (!listingId) {
            common.redirectToIndex(req, res);
            return;
        }

        var ListingModel = modelProvider.getModelByName('location');

        ListingModel.findById(listingId, function (err, listing) {
            if (err) {
                res.send('find some locations failed: ' + err);
                return;
            }

            var LocationModel = modelProvider.getModelByName('location');
            LocationModel.find({ locationId: locationId }, function (err, location) {
                if (err) {
                    res.send('Failed to find location because of: ' + err);
                    return;
                }

                req.session.listing = listing;

                res.render('location/viewLocation', {
                    user: req.session.user,
                    location: location,
                    comments: comments
                });
            })
        })
    }
}