module.exports = (objRepo, view) => {
    return (req, res, next) => {
        console.log(res.locals);
        res.render(view, res.locals);
    }
}