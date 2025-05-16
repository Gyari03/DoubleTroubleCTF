module.exports = (objRepo) => {
    const {UserModel} = objRepo;
    return async (req, res, next) => {
        const {Email,Username,Password} = req.body;
        const userId= req.session.user.id;
        const user = await UserModel.findById(userId);

        if(!(Email || Username || Password)){
            return res.status(400).send(`<img src="https://http.cat/400.jpg" alt="400 Bad Request">`);
        }

        if(Email && Email !== user.Email){
            user.Email = Email;

            const emailExists = await UserModel.findOne({Email});
            if(emailExists && emailExists._id !== user._id){
                return res.status(400).send(`<img src="https://http.cat/400.jpg" alt="400 Bad Request">`);
            }
        }else if(Username){
            user.Username = Username;
            const userExists = await UserModel.findOne({Username});
            if(userExists && userExists._id !== user._id){
                return res.status(400).send(`<img src="https://http.cat/400.jpg" alt="400 Bad Request">`);
            }
        }else if(Password){
            user.Password = Password;
        }else{
            return res.status(400).send(`<img src="https://http.cat/400.jpg" alt="400 Bad Request">`);
        }
        await user.save();
        return res.status(200).redirect("/profile");
    }
}