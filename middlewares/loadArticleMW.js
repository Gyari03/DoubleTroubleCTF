const marked = require('marked');

module.exports = (objRepo) => {
    const { ArticleModel } = objRepo;

    return async (req, res, next) => {
        try {
            const article = await ArticleModel.findById(req.params.id);
            if (!article) {
                return res.status(404).send(`<img src="https://http.cat/404.jpg" alt="404 Not Found">`);
            }
            res.locals.article = article;
            res.locals.contentHtml = marked.parse(article.Content || '');
            return next();
        } catch (err) {
            return next(err);
        }
    };
};
