module.exports = (objRepo) => {
    const {TokenModel,UserModel} = objRepo;

    return async(req,res,next)=>{
        const {validToken} = res.locals;
        const {newPassword, confirmPassword} = req.body;

        if(!newPassword || !confirmPassword)

        if(newPassword!==confirmPassword){
            return res.status(400).send(`<img src="https://http.cat/400.jpg" alt="400 Bad Request">`);
        }

        const existingUser = await UserModel.findById(validToken.user);

        if(!existingUser){
            return res.status(400).send(`<img src="https://http.cat/400.jpg" alt="400 Bad Request">`);
        }
        existingUser.Password = newPassword;
        existingUser.save();

        TokenModel.deleteOne({_id:validToken._id})

        return res.redirect('/');
    }
}