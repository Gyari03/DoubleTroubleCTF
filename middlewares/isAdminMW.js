module.exports = (objRepo) => {
    const {UserModel} = objRepo;
    return async (req, res, next) => {
        if (!req.session.user) {
            return res.redirect('/login');
        }
        try{
            const userId = req.session.user.id;
            const user = await  UserModel.findById(userId);
            if (user.Role !== 'admin') {
                return res.status(403).send(`<img src="https://http.cat/403.jpg" alt="403 Forbidden">`);
            }
            return next();
        }catch(err){
            console.error('Error fetching user:', err);
            return res.status(500).send('Internal Server Error');
        }
    };
};
