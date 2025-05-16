module.exports = (objRepo) => {
    const {ArticleModel} = objRepo;
    return async (req, res, next) => {
        const searchQuery = req.query.search;

        let articles;

        if(searchQuery){
            articles = await ArticleModel.find({
               Title: { $regex: searchQuery,$options: 'i'}
            });
        }
        else{
            articles = await ArticleModel.find({});
        }
        res.locals.articles = articles;
        res.locals.search = searchQuery;
        
        return next();
    }
}