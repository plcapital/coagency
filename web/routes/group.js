exports.listAllPage = function (modelProvider) {
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

exports.listPage = function (modelProvider) {
    return function (req, res) {
        var groupUserModel = modelProvider.getModelByName('groupUser');

        groupUserModel.find({ userId: req.session.user._id }, function (err, groupUsers) {
            var groupModel = modelProvider.getModelByName('group');

            var groupIds = [];
            var numberOfGroupUsers = groupUsers.length;
            for (var i = 0; i < numberOfGroupUsers; i++) {
                groupIds.push(groupUsers[i].groupId)
            }

            console.log(groupIds);

            groupModel.find({ _id: { $in: [ groupIds ] } }, function (err, groups) {
                if (err) {
                    // TODO handle err
                    console.log(err);
                } else {
                    res.render('group/groups', {
                        "groups": groups
                    });
                }
            });
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
        var groupAdministrator = req.session.user._id;

        var GroupModel = modelProvider.getModelByName('group');

        var group = new GroupModel({
            name: groupName,
            description: groupDescription,
            administrator: groupAdministrator
        });

        group.save(function (err) {
            if (err) {
                res.send("There was a problem adding the information to the database.");
            } else {
                var GroupUserModel = modelProvider.getModelByName('groupUser');

                var groupUser = new GroupUserModel({
                    userId: groupAdministrator,
                    groupId: group._id
                });

                groupUser.save(function (err) {
                    if (err) {
                        res.send("There was a problem adding the information to the database.");
                    } else {
                        res.location("/groups")
                        res.redirect("/groups")
                    }
                });
            }
        })
    }
}

exports.viewPage = function (modelProvider) {
    return function (req, res) {
        var GroupModel = modelProvider.getModelByName('group');

        GroupModel.findById(req.query.groupId, function (err, group) {
            if (err) {
                res.send('find some post failed: ' + err);
                return;
            }

            if (group == null) {
                // TODO some sort of ?404? error
                res.location('/groups');
                res.redirect('/groups');
            }

            var isAdministrator = req.session.user._id == group.administrator;

            res.render('group/viewPage', { name: group.name, description: group.description, isAdministrator: isAdministrator });
        })
    }
}
