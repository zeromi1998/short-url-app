const mongoose=require("mongoose");

const shortId=require("shortid");
const Schema=mongoose.Schema;


const Url=new Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true,
        //create short id  by generate
        default:shortId.generate() 
    }
})

const saveUrl=mongoose.model("saveUrl",Url)

module.exports=saveUrl;