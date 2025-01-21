import mongose from "mongoose"

const UserSchema=new mongose.Schema({
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

const UserModel=mongose.model("Users",UserSchema)

export default UserModel