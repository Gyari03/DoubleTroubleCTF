module.exports = (objRepo) => {
    const {UserModel} = objRepo;
    return async (req, res, next) => {
        const userId= req.session.user.id;
        const user = await UserModel.findById(userId);

        res.locals.profile = {
            _id: user._id,
            Email: user.Email,
            Username: user.Username,
        }
        return next();
    }
}
