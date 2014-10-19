exports.addGroupUser = function (modelProvider) {
    return function (req, res) {
        var UserModel = modelProvider.getModelByName('user');

        UserModel.findOne({ "username": req.body.username }, function (err, user) {
            if (err) {
                // TODO handle err
                console.log(err);
            } else {
                var GroupUserModel = modelProvider.getModelByName('groupUser');

                var groupUser = new GroupUserModel({
                    userId: user._id,
                    groupId: req.body.groupId
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
        });
    }
}

exports.addGroupUserPage = function (modelProvider) {
    return function (req, res) {
        if (!req.session.user || !req.query.groupId) {
            res.location("/");
            res.redirect("/");
            return;
        }

        var groupModel = modelProvider.getModelByName('group');

        groupModel.findById(req.query.groupId, function (err, group) {
            if (err) {
                res.send("Invalid group id!<br>" + err);
                return;
            }

            res.render('group/addUser', {
                "group": group
            });
        });

        ;  
    }
}

exports.createGroup = function (modelProvider) {
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

exports.createGroupPage = function (req, res) {
    if (!req.session.user) {
        // TODO handle err
        res.location("/");
        res.redirect("/");
        return;
    }

    res.render('group/createGroup', { title: 'Add New Group' });
}

exports.listAllGroupsPage = function (modelProvider) {
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

exports.listGroupsPage = function (modelProvider) {
    return function (req, res) {
        if (!req.session.user) {
            // TODO handle err
            res.location("/");
            res.redirect("/");
            return;
        }

        var groupUserModel = modelProvider.getModelByName('groupUser');

        groupUserModel.find({ userId: req.session.user._id }, function (err, groupUsers) {
            if (err) {
                // TODO handle err
                console.log(err);
            } else {
                var numberOfGroupUsers = groupUsers.length;
                // If this user doesn't belong to any groups
                if (numberOfGroupUsers == 0) {
                    // TODO add information message for user
                    res.location("/")
                    res.redirect("/")
                }

                var groupModel = modelProvider.getModelByName('group');

                var groupIds = [];
                for (var i = 0; i < numberOfGroupUsers; i++) {
                    groupIds.push(groupUsers[i].groupId)
                }

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
            }
        });
    }
}

exports.viewGroupPage = function (modelProvider) {
    return function (req, res) {
        if (!req.session.user || !req.query.groupId) {
            res.location("/");
            res.redirect("/");
            return;
        }

        var GroupModel = modelProvider.getModelByName('group');

        GroupModel.findById(req.query.groupId, function (err, group) {
            if (err) {
                res.send("Invalid group id!<br>" + err);
                return;
            }

            if (group == null) {
                // TODO some sort of ?404? error
                res.location('/groups');
                res.redirect('/groups');
            } else {
                var ListingModel = modelProvider.getModelByName("post");

                ListingModel.find({ groupId: req.query.groupId }, function (err, listings) {
                    if (err) {
                        // TODO handle error
                        res.send('');
                        return;
                    } else {
                        var isAdministrator = req.session.user._id == group.administrator;

                        res.render('group/viewPage', { "group": group, "isAdministrator": isAdministrator, listings: listings });
                    }                    
                });
            }
        })
    }
}
