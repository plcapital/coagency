exports.createPage = function (req, res) {
    res.render('group/createGroup', { title: 'Add New Group' });
}

exports.create = function (modelProvider) {
    return function (req, res) {

        var groupName = req.body.groupName;
        var groupDescription = req.body.groupDescription;

        var GroupModel = modelProvider.getModelByName('group');

        var group = new GroupModel({
            name: groupName,
            phone: groupDescription
        });
        
        group.save(function (err) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                res.location("/")
                res.redirect("/")
            }
        })
    }
}
