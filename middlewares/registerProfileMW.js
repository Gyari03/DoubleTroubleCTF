module.exports = (objRepo) => {
    const {UserModel} = objRepo;

    return async (req, res, next) => {
        const {Email, Username, Password} = req.body;
        if(!Email || !Username || !Password){
            return res.status(400).send(`<img src="https://http.cat/400.jpg" alt="400 Bad Request">`);
        }

        const existingUser = await UserModel.findOne( {$or: [{Email}, {Username}]});
        if(existingUser){
            return res.status(409).send(`<img src="https://http.cat/409.jpg" alt="409 Conflict">`);
        }

        const newUser = new UserModel;
        newUser.Email = Email;
        newUser.Username = Username;
        newUser.Password = Password;
        newUser.Role = 'user';
        newUser.save();

        return res.redirect('/login');
    }
}