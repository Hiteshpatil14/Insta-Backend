const { request } = require("express")
const express = require("express")
const mongoose = require("mongoose")
const router = express.Router()
const tokenvarify =require("../middleware/tokenvalidate")
const Post=mongoose.model("Post")


router.get("/allpost",(req,resp)=>{
     
    Post.find()
    .populate("postedBy","name _id")
    .then(result=>{
        resp.json(result)
    })
    .catch(err=>{
        console.log(err)
    })

})

router.post("/addpost",tokenvarify,(req,resp)=>{
    const {title ,body}=req.body
    if(!title || !body ){
       return resp.json({error :"plz enter all post details"})
    }
    
req.user.password=undefined
    const data=new Post({
        title,
        body,
        postedBy:req.user
    })
    
    data.save()
    .then(saved=>{
        resp.json({saved})
    })
    .catch((err)=>{
        console.log(err)
    })
})

router.get("/mypost",tokenvarify,(req,resp)=>{
     Post.find({postedBy:req.user._id})
     .populate("postedBy","_id name")
     .then(result=>{
        resp.json({result})
     })
     .catch(err=>{
        console.log(err)
     })

})
module.exports=router