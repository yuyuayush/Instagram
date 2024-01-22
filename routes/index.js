const express = require("express");
const userModel = require("../model/userModel");
const postModel = require("../model/postModel");
const router = express.Router();


router.get("/feed",isLogged,async(req,res)=>{
    const user = await userModel.findOne({email:req.session.email});
    const post = await postModel.find().populate('user');
    res.render('feed',{footer:true,post,user});
})
router.get("/login",(req,res)=>{
    res.render('login',{footer:false});
})
router.get("/",(req,res)=>{
    res.render('index',{footer:false});
})
router.get("/edit",isLogged,async(req,res)=>{
    const user = await userModel.findOne({email:req.session.email});
    res.render('edit',{footer:false,user});
})
router.get("/profile",isLogged,async(req,res)=>{
    const user = await userModel.findOne({email:req.session.email}).populate("posts");
   
    res.render('profile',{footer:true,user});
});
router.get("/search",(req,res)=>{
    res.render('search',{footer:true});
});
router.get("/username/:id",async(req,res)=>{
    const regex = new RegExp(`^${req.params.id}`,'i');
    const users =await userModel.find({username:regex});
    res.json(users);
});
router.get("/upload",(req,res)=>{
    res.render('upload',{footer:true});
});
function isLogged (req,res,next){
    if(req.session.email)
     next();
    else
    res.redirect('/');
}


module.exports = router;