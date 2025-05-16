const {mongoose} = require('../config/db');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    Email: {
        type: String,
        required: true,
        index:{unique: true}
    },
    Username:{
        type: String,
        required: true,
        index:{unique:true}
    },
    Password:{
        type: String,
        required: true
    },
    Role: {
        type: String,
        enum: ['user', 'admin'],
        default: 'user'
    }
});
const User = mongoose.model('User', userSchema);

module.exports = User;