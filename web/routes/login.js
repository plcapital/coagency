/**
 * Functions related to user login belong here.
 */

var crypto = require('crypto');

/**
 * Bytesize.
 */
var len = 128;

exports.loginPage = function (req, res) {
    res.render('login');
};

exports.loginAuthentication = function (req, res) {
    authenticate(req.body.username, req.body.password, function (err, user) {
        if (user) {
            // Regenerate session when signing in to prevent fixation
            req.session.regenerate(function () {
                // Store the user's primary key in the session store to be retrieved, or in this case the entire user
                // object
                req.session.user = user;

                res.location("/")
                res.redirect("/")
            });
        } else {
            res.render('login', {
                "errorMsg": "Authentication failed, please check your username and password."
            });
        }
    });
};


// TODO this needs to come from the database
var users = {
    buyer: { name: 'buyer' },
    seller: { name: 'seller' }
};

// TODO this needs to be moved into the database
hash('foobar', function (err, salt, hash) {
    if (err) throw err;
    // store the salt & hash in the "db"
    users.buyer.salt = salt;
    users.buyer.hash = hash;
    users.seller.salt = salt;
    users.seller.hash = hash;
});

function authenticate(name, pass, fn) {
    if (!module.parent) console.log('authenticating %s:%s', name, pass);
    var user = users[name];
    // query the db for the given username
    if (!user) return fn(new Error('cannot find user'));
    // apply the same algorithm to the POSTed password, applying
    // the hash against the pass / salt, if there is a match we
    // found the user
    hash(pass, user.salt, function (err, hash) {
        if (err) return fn(err);
        if (hash == user.hash) return fn(null, user);
        fn(new Error('invalid password'));
    })
}


// check out https://github.com/visionmedia/node-pwd

/**
 * Iterations. ~300ms
 */

var iterations = 12000;

/**
 * Hashes a password with optional `salt`, otherwise
 * generate a salt for `pass` and invoke `fn(err, salt, hash)`.
 *
 * @param {String} password to hash
 * @param {String} optional salt
 * @param {Function} callback
 * @api public
 */

function hash(pwd, salt, fn) {
    if (3 == arguments.length) {
        crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
            fn(err, hash.toString('base64'));
        });
    } else {
        fn = salt;
        crypto.randomBytes(len, function(err, salt){
            if (err) return fn(err);
            salt = salt.toString('base64');
            crypto.pbkdf2(pwd, salt, iterations, len, function(err, hash){
                if (err) return fn(err);
                fn(null, salt, hash.toString('base64'));
            });
        });
    }
};
