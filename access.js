function requireLogin(req, res, next) {
    if (req.session.user) {
        next();
    } else {
        res.json({
            success: 0,
            message: "You must be logged in"
        });
    }
}

function isLoggedIn(req, res, next) {
    if (req.session.user) {
        res.json({
            success: 1
        })
    } else {
        res.json({
            success: 0
        })
    }
}

module.exports = {requireLogin, isLoggedIn};
