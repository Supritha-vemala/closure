import mongoose from "mongoose";

const usersSchema = new mongoose.Schema({
 email:{
    type:String,   
 },
 userName:{
    type:String,
     required:true,
     unique:true
 },
 name:{
    type:String,
 },
 password:{
     type:String,
     required:true,
 }
});

const usersModel = mongoose.model("users", usersSchema);

export { usersModel};
