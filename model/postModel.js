const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    description:String,
    picture:String,
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    likes:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"

        }
    ],
    date:{
        type:Date,
        default: Date.now,
    }
});
const PostModel =  mongoose.model('Post',postSchema);
module.exports=PostModel;
