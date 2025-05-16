module.exports = (objRepo) => {
    const { ArticleModel } = objRepo;

    return async (req, res, next) => {
        const { Title, Content } = req.body;

        if (!Title || !Content) {
            return res
                .status(400)
                .send(`<img src="https://http.cat/400.jpg" alt="400 Bad Request">`);
        }

        const existingArticle = await ArticleModel.findOne({ Title });
        if (existingArticle) {
            return res
                .status(409)
                .send(`<img src="https://http.cat/409.jpg" alt="409 Conflict">`);
        }

        const newArticle = new ArticleModel({
            Title,
            Content,
        });

        try {
            await newArticle.save();
            return res.redirect('/');
        } catch (err) {
            return next(err);
        }
    };
};