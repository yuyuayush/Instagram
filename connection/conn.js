const mongoose = require("mongoose");
mongoose.connect("mongodb+srv://ayush:19122001an@cluster0.xm7fm.mongodb.net/instagram_clone").then(()=>{
    console.log('connection success');
}).catch((err)=>{
    console.log(`connection fail ${err}`);
});

