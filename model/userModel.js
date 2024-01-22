const mongoose = require('mongoose');
//this is passport will carry with it self;
const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
      posts: [
        {
          type:mongoose.Schema.Types.ObjectId,
          ref:'Post'
        }
      ],
      profileImage: {
        type: String, // Assuming the profile picture is stored as a URL or file path
      },
      email: {
        type: String,
      },
      name: {
        type: String,
        required: true,
      },
      bio: {
        type: String
      }
});

const userModel =  mongoose.model('User',userSchema);
module.exports = userModel;