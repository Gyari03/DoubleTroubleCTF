module.exports = (objRepo) => {
    const {TokenModel} = objRepo;

    return async(req,res,next)=>{
        const {token} = req.params;

        if(!token){
            return res.status(400).send(`<img src="https://http.cat/400.jpg" alt="400 Bad Request">`);
        }
        const validToken = await TokenModel.findOne({token: token})
        if(!validToken){
            return res.status(400).send(`<img src="https://http.cat/400.jpg" alt="400 Bad Request">`);
        }
        res.locals.validToken = validToken;

        return next();
    }
}