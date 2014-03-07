exports.createPage = function (req, res) {
    res.render('agency/createAgency', { title: 'Add New Agency' });
}

exports.create = function (modelProvider) {
    return function (req, res) {

        var agencyName = req.body.agencyName;
        var agencyPhone = req.body.agencyPhone;

        var AgencyModel = modelProvider.getModelByName('agency');

        var agency = new AgencyModel({
            name: agencyName,
            phone: agencyPhone
        });
        
        agency.save(function (err) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                res.location("/")
                res.redirect("/")
            }
        })
    }
}
