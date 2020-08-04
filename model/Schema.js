const mongoose =require("mongoose");


const Schema=mongoose.Schema;

const shortSchema= new Schema({

    name:{
        type:String,
      //  required:true
    },
    email:{
        type:String,
      // required:true,
        unique:true

    },
    password:{
        type:String,
     //  required:true
    },


})


const uProfile=mongoose.model("uProfile",shortSchema);

module.exports=uProfile