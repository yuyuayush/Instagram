const express = require("express");
const router = express.Router();
const postModel =require("../model/postModel");
const userModel = require("../model/userModel");
const upload = require("../multer");
router.post("/upload",upload.single("image"),async(req,res)=>{
try{
    const {description,image}= req.body;
    const user = await userModel.findOne({email:req.session.email});
    const post =await postModel.create({
       description,picture:req.file.filename,user:user._id
    });
    user.posts.push(post._id);
    await user.save();
    res.redirect("/feed");
    
}
catch(err){
    res.send(err);
}    
})
router.get("/like/post/:id",isLogged,async(req,res)=>{
    const id =req.params.id;
    const user = await userModel.findOne({email:req.session.email});
    const post = await postModel.findById(id);

    //if already like then remve ;;

    if(post.likes.indexOf(user._id) === -1 ){
        post.likes.push(user._id);
    }
    else{
        post.likes.splice(post.likes.indexOf(user._id),1);
    }
   await post.save();
   res.redirect('/feed');

})
function isLogged (req,res,next){
    if(req.session.email)
     next();
    else
    res.redirect('/');
}


module.exports = router;