module.exports = (objRepo) => {
    return (req, res, next) => {
        req.session.destroy(() => {
            res.clearCookie('connect.sid');
            res.redirect('/login');
        });
    }
}