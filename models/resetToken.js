const {mongoose} = require('../config/db');
const Schema = mongoose.Schema;

const resetTokenSchema = new Schema({
   user: {
       type: Schema.Types.ObjectId,
       ref: 'User',
       required: true,
   },
    token:{
      type:  String,
    },
    createdAt:{
        required:true,
        type: Date,
        default: Date.now,
    },
});
resetTokenSchema.index({createdAt: 1}, {expireAfterSeconds: 3600});

const Token = mongoose.model('Token',resetTokenSchema);

module.exports = Token;

