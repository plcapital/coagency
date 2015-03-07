var common = require('../utils/common');

exports.create = function (modelProvider) {
    return function (req, res) {
        var agencyName = req.body.agencyName;
        var agencyPhone = req.body.agencyPhone;

        var AgencyModel = modelProvider.getModelByName('agency');
        var UserModel = modelProvider.getModelByName('user');

        // Fetch user from DB using username and save _id into 'administrator' field
        UserModel.findOne({'username': req.session.user.name}, function (err, user) {
            if (err) {
                res.send('find some one failed: ' + err);
                return;
            }

            var agency = new AgencyModel({
                administrator: user._id,
                name: agencyName,
                phone: agencyPhone
            });

            agency.save(function (err) {
                if (err) {
                    res.send('There was a problem adding the information to the database.');
                } else {
                    res.location('/');
                    res.redirect('/');
                }
            })
        })
    }
}

exports.createAgencyPage = function (req, res) {
    if (common.redirectToIndexIfNotLoggedIn(req, res)) {
        return;
    }
    
    res.render('agency/createAgency', {
        title: 'Add New Agency'
    });
}
