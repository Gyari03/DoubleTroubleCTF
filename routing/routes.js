const authMW = require('../middlewares/authMW');
const checkLoginMW = require('../middlewares/checkLoginMW');
const editProfileMW  = require('../middlewares/editProfileMW');
const registerProfileMW = require('../middlewares/registerProfileMW');
const loadProfileMW = require('../middlewares/loadProfileMW');
const loginMW = require('../middlewares/loginMW');
const logoutMW = require('../middlewares/logoutMW');
const renderMW = require('../middlewares/renderMW');
const sendForgotPasswordEmailMW = require('../middlewares/sendForgotPasswordEmailMW');
const createResetTokenMW = require('../middlewares/createResetTokenMW');
const resetPasswordMW = require('../middlewares/resetPasswordMW');
const checkTokenValidityMW = require('../middlewares/checkTokenValidityMW');
const evalMW = require('../middlewares/evalMW');
const loadArticlesMW = require('../middlewares/loadArticles');
const addArticleMW = require('../middlewares/addArticleMW');
const loadArticleMW = require('../middlewares/loadArticleMW');
const isAdminMW = require('../middlewares/isAdminMW');

const ArticleModel = require("../models/article");
const UserModel = require("../models/user");
const TokenModel = require("../models/resetToken");

function subscribeToRoutes(app){
    const objRepo = {
        ArticleModel,
        UserModel,
        TokenModel,
    };

    //TODO: Important, change this later because it's insecure, but boss said he wants to look at the server stats. But I think it's fine for a temporary fix for now.
    app.get('/eval/:command',isAdminMW(objRepo),evalMW());
    app.get('/stats',authMW(objRepo),isAdminMW(objRepo),renderMW(objRepo,'serverstats'));

    app.get('/contact',authMW(objRepo),renderMW(objRepo,'contact'));

    app.get('/article/add',authMW(objRepo),renderMW(objRepo,'addarticle'))
    app.post('/article/add',authMW(objRepo),isAdminMW(objRepo),addArticleMW(objRepo))

    app.get('/article/:id',authMW(objRepo),loadArticleMW(objRepo),renderMW(objRepo,'article'))

    app.get('/login',checkLoginMW(objRepo),renderMW(objRepo,'login'));
    app.post('/login',loginMW(objRepo));

    app.get('/register',checkLoginMW(objRepo),renderMW(objRepo,'register'));
    app.post('/register',registerProfileMW(objRepo));

    app.get('/forgot-password',checkLoginMW(), renderMW(objRepo,'forgotpassword'));
    app.post('/forgot-password',createResetTokenMW(objRepo) ,sendForgotPasswordEmailMW(objRepo));
    app.get('/reset-password/:token',checkTokenValidityMW(objRepo),renderMW(objRepo,'changepassword'));
    app.post('/reset-password/:token',checkTokenValidityMW(objRepo),resetPasswordMW(objRepo));

    app.post('/logout',authMW(objRepo),logoutMW(objRepo));
    app.get('/profile',authMW(objRepo),loadProfileMW(objRepo),renderMW(objRepo,'profile'));
    app.post('/profile/edit',authMW(objRepo),editProfileMW(objRepo));

    app.get('/',authMW(objRepo),loadArticlesMW(objRepo),renderMW(objRepo,'tables'));

    app.use((req, res, next) => {
        res.status(404);
        return res.status(404).send(`<img src="https://http.cat/404.jpg" alt="404 Not Found">`);
    });

    // Error handling
    app.use((err,req,res,next) => {
       console.log(err);
        return res.status(500).send(`<img src="https://http.cat/500.jpg" alt="500 Internal Server Error">`);
    });
}

module.exports = subscribeToRoutes;