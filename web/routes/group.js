var common = require('../utils/common');

exports.addGroupUser = function (modelProvider) {
    return function (req, res) {
        var UserModel = modelProvider.getModelByName('user');

        UserModel.findOne({ username: req.body.username }, function (err, user) {
            if (err) {
                // TODO handle err
                console.log(err);
            } else {
                if (user == null) {
                    // TODO add error message here
                    res.location('/listGroups');
                    res.redirect('/listGroups');
                    return;
                }

                var GroupUserModel = modelProvider.getModelByName('groupUser');

                GroupUserModel.findOne({ userId: user._id, groupId: req.session.group._id }, function (err, existingGroupUser) {
                    if (existingGroupUser != null) {
                        res.send('User is already in this group.');
                        return;
                    }

                    var groupUser = new GroupUserModel({
                        userId: user._id,
                        groupId: req.session.group._id
                    });

                    groupUser.save(function (err) {
                        if (err) {
                            res.send('There was a problem adding the information to the database.');
                        } else {
                            res.location('/listGroups');
                            res.redirect('/listGroups');
                        }
                    });
                })

            }
        });
    }
};

exports.addGroupUserPage = function (modelProvider) {
    return function (req, res) {
        if (common.redirectToIndexIfNotLoggedIn(req, res)) {
            return;
        }

        var groupModel = modelProvider.getModelByName('group');

        groupModel.findById(req.session.group._id, function (err, group) {
            if (err) {
                res.send('Invalid group id!<br>' + err);
                return;
            }

            res.render('group/addGroupUser', {
                user: req.session.user,
                group: group
            });
        });
    }
};

exports.createGroup = function (modelProvider) {
    return function (req, res) {
        var groupName = req.body.groupName;
        var groupDescription = req.body.groupDescription;
        var groupAdministrator = req.session.user._id;

        var GroupModel = modelProvider.getModelByName('group');

        GroupModel.findOne({ name: groupName }, function (err, existingGroup) {
            if (err) {
                res.send('find some one failed: ' + err);
                return;
            }

            if (!existingGroup) {
                var group = new GroupModel({
                    name: groupName,
                    description: groupDescription,
                    administrator: groupAdministrator
                });

                group.save(function (err) {
                    if (err) {
                        res.send('There was a problem adding the information to the database.');
                    } else {
                        var GroupUserModel = modelProvider.getModelByName('groupUser');

                        var groupUser = new GroupUserModel({
                            userId: groupAdministrator,
                            groupId: group._id
                        });

                        groupUser.save(function (err) {
                            if (err) {
                                res.send('There was a problem adding the information to the database.');
                            } else {
                                res.location('/listGroups');
                                res.redirect('/listGroups');
                            }
                        });
                    }
                })
            } else {
                res.render('index', {
                    user: req.session.user,
                    errorMsg: 'Sorry, that group name has already been taken.'
                });
            }
        });
    }
};

exports.createGroupPage = function (req, res) {
    if (common.redirectToIndexIfNotLoggedIn(req, res)) {
        return;
    }

    res.render('group/createGroup', {
        user: req.session.user
    });
};

exports.listAllGroupsPage = function (modelProvider) {
    return function (req, res) {
        if (common.redirectToIndexIfNotLoggedIn(req, res)) {
            return;
        }

        var GroupModel = modelProvider.getModelByName('group');

        GroupModel.find(function (err, groups) {
            if (err) {
                // TODO handle err
                console.log(err);
            } else {
                res.render('group/listGroups', {
                    user: req.session.user,
                    groups: groups
                });
            }
        });
    }
};

exports.listGroupsPage = function (modelProvider) {
    return function (req, res) {
        if (common.redirectToIndexIfNotLoggedIn(req, res)) {
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
                    res.location('/');
                    res.redirect('/');
                    return;
                }

                var groupIds = [];
                for (var i = 0; i < numberOfGroupUsers; i++) {
                    groupIds.push(groupUsers[i].groupId)
                }

                var groupModel = modelProvider.getModelByName('group');

                groupModel.find({ _id: { $in: groupIds } }, function (err, groups) {
                    if (err) {
                        // TODO handle err
                        console.log(err);
                    } else {
                        res.render('group/listGroups', {
                            user: req.session.user,
                            groups: groups
                        });
                    }
                });
            }
        });
    }
};

exports.viewGroupPage = function (modelProvider) {
    return function (req, res) {
        if (common.redirectToIndexIfNotLoggedIn(req, res)) {
            return;
        }

        var GroupModel = modelProvider.getModelByName('group');

        GroupModel.findById(req.query.groupId, function (err, group) {
            if (err) {
                res.send('Invalid group id!<br>' + err);
                return;
            }

            if (group == null) {
                // TODO some sort of ?404? error
                res.location('/listGroups');
                res.redirect('/listGroups');
            } else {
                var ListingModel = modelProvider.getModelByName('listing');

                ListingModel.find({ groupId: req.query.groupId }, function (err, listings) {
                    if (err) {
                        // TODO handle error
                        res.send('');
                    } else {
                        var isAdministrator = req.session.user._id == group.administrator;

                        req.session.group = group;

                        res.render('group/viewGroup', {
                            user: req.session.user,
                            group: group,
                            isAdministrator: isAdministrator,
                            listings: listings
                        });
                    }                    
                });
            }
        })
    }
};
