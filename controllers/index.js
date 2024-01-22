const express =require('express');

// const router = express.Router();
 const getAll = (req,res)=>{
    res.send("hello");
}
const getOne =(req,res)=>{
    console.log('getone ka andr ');
}


module.exports = {getAll,getOne};