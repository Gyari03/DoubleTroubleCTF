const Article = require('./models/article');

const createDefaultArticles = async () => {
    try {
        const articles = [
            {
                Title: "The Quirks of JavaScript’s Flexible Typing in Node.js",
                Content: `
Node.js runs on JavaScript, and one of the things that makes JavaScript so flexible is how it handles data types. Unlike some other languages, JavaScript doesn't require you to declare the type of a variable—like whether it's a number, a string, or an object. This is known as **"weak typing,"** and it gives developers a lot of freedom to work with data.

While this can speed up development, it also means JavaScript doesn't always check if the data you're using matches what you expect. For example, you can assign a number to a variable and later use it as a string, and JavaScript won’t throw any errors. This kind of flexibility can be handy, but it can also lead to some unexpected behavior if you're not careful.

In backend development with Node.js, this flexibility can sometimes cause issues if the data isn't checked properly. So while JavaScript’s loose typing lets developers move quickly, it’s also important to stay on top of how data is handled to avoid things going a bit off track.

At the end of the day, JavaScript’s flexible approach to data types is both a strength and a challenge!
        `
            },
            {
                Title: "Trust Issues: Why Frontend Validation Isn't Enough",
                Content: `
When building web applications, it’s common to rely on frontend validation to make sure users enter the “right” kind of data. Input constraints, required fields, dropdowns - they all help guide the user. But it’s important to remember: **none of this actually protects your backend.**

Frontend validation is just a convenience. It lives entirely in the browser, and anything in the browser can be changed. Fields can be modified, restrictions can be removed, and requests can be crafted manually using tools like \`curl\` or Postman.

If the backend assumes the data has already been cleaned or checked by the frontend, that’s a problem. **Validating and sanitizing input on the server side is essential** - especially if anything critical depends on it.

This isn’t just about catching errors. It’s about understanding that the frontend is not a trusted environment. The real logic - the real checks - need to happen where the user can’t tamper with them.

So if you're testing an application, don’t just interact with it the way the UI expects. Try sending requests directly. Change the shape of the data. You might be surprised what slips through.
        `
            }
        ];

        for (const articleData of articles) {
            const existing = await Article.findOne({ Title: articleData.Title });
            if (!existing) {
                const article = new Article(articleData);
                await article.save();
                console.log(`Article "${articleData.Title}" created.`);
            } else {
                console.log(`Article "${articleData.Title}" already exists.`);
            }
        }
    } catch (err) {
        console.error('Error creating default articles:', err);
    }
};

module.exports = createDefaultArticles;
