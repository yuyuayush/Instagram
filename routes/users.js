const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const userModel = require("../model/userModel");
const upload = require("../multer");

router.post("/register",async(req,res)=>{
try{
    const{username,name,email,password} = req.body;
    const userData =await userModel.create({
        username,name,email,password
    });
    req.session.email = email;
    res.redirect("/feed");
}catch(err){
res.status(404).send(`errorr occured init ${err}`);
}
});

router.post("/login",async(req,res)=>{

const {email,password}=req.body;
try {
    let user = await userModel.findOne({email});
    if(user){
        if(`${user.password}` == password){
            req.session.email = email;
          return res.redirect("/feed");
        }
        res.status(404).send({error:"thers is some error"});
        console.log("no pass incorrect");
    }
    
    res.status(404).send({error:"thers is some error"});

} catch (error) {
    res.status(404).json({error:error});
}
})
router.get("/logout",(req,res)=>{
req.session.destroy((err)=>{
    if(err)
    console.log(err);
else
res.redirect("/");
})

});


router.post("/update",upload.single("file"),async(req,res)=>{
try {
const {name,username,bio}=req.body;  
const user = await userModel.findOneAndUpdate({email:req.session.email},
        {
            username,name,bio,
        },
        {new:true}
        );
        if(req.file)
        user.profileImage=req.file.filename;
        
    await user.save();
    res.redirect("/profile");
} catch (error) {
    res.send(`somthing is error${error}`);
}

})



module.exports = router;