import mongoose from "mongoose"

const UserSchema=new mongoose.Schema({
    userName:{
        type:String
    },

    email:{
        type:String
    },

    password:{
        type:String
    },
},{timestap:true})

const UserModel=mongoose.model("Users",UserSchema)

export default UserModel