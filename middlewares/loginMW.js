module.exports = (objRepo) => {
    const {UserModel} = objRepo;

    return async (req, res, next) => {
        const {Email, Password} = req.body;

        console.log(Email);
        console.log(Password);
        if(!Email || !Password){
            return res.status(400).send(`<img src="https://http.cat/400.jpg" alt="400 Bad Request">`);
        }
        try{
            const user = await UserModel.findOne({Email,Password});

            if(!user){
                return res.status(401).send(`<img src="https://http.cat/400.jpg" alt="400 Bad Request">`);
            }

            req.session.user = {
                id: user._id,
                username: user.username
            };

        }catch(error){
            return next(error);
        }

        return res.redirect('/');
    }
}