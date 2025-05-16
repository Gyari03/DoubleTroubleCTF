const { mongoose } = require('../config/db');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    Title: {
        type: String,
        required: true,
        index: { unique: true }
    },
    Content: {
        type: String,
        required: true
    },
    CreatedAt: {
        type: Date,
        default: Date.now
    }
});
const Article = mongoose.model('Article', articleSchema);

module.exports = Article;