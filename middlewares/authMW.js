module.exports = (objRepo) => {
    const {UserModel} = objRepo;
    return async (req, res, next) => {
        if(!req.session.user){
            return res.redirect('/login');
        }
        try{
            if(req?.session?.user?.id){
                const user = await UserModel.findById(req.session.user.id);
                res.locals.user = user;
            }
        }catch (error){
            console.log(error);
            return next(error);
        }
        return next();
    }
}