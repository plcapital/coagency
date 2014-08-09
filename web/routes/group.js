exports.listPage = function (modelProvider) {
    return function (req, res) {
        var groupModel = modelProvider.getModelByName('group');

        groupModel.find(function (err, groups) {
            if (err) {
                // TODO handle err
                console.log(err);
            } else {
                res.render('group/groups', {
                    "groups": groups
                });
            }
        });
    }
}

exports.createPage = function (req, res) {
    res.render('group/createGroup', { title: 'Add New Group' });
}

exports.create = function (modelProvider) {
    return function (req, res) {

        var groupName = req.body.groupName;
        var groupDescription = req.body.groupDescription;

        var GroupModel = modelProvider.getModelByName('group');

        // TODO insert administrator ObjectId (based on current user)
        var group = new GroupModel({
            name: groupName,
            description: groupDescription
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
