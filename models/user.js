const mongoose=require("mongoose");
const Schema=mongoose.Schema;
const passportLocalMongoose=require("passport-Local-Mongoose");
const userSchema=new Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
});

userSchema.plugin(passportLocalMongoose);
const User=mongoose.model("User",userSchema);
module.exports=User;