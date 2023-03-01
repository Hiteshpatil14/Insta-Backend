const mongoose =require("mongoose")
const {ObjectId}=mongoose.Schema.Types

const Postschema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    photo:{
        type:String
    },
    postedBy:{
        type:ObjectId,
        ref:"user"
    }
})

module.exports=mongoose.model("Post",Postschema)