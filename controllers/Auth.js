import UserModel from "../models/Auth.js"
import bycript from 'bcryptjs'                                        //library in nodejs for securely hashing & verifying passwords
import jwt from 'jsonwebtoken'                                        // for token, authentication

// const Register=async(req,res)=>{
//     res.send('hello world from controllers')
// }

//APi for register

const Register=async(req,res)=>{


    
    try{
        const{userName,email,password}=req.body              //user will send this to us
        if(!userName||!email||!password){
            return res.status(303).json({sucess:false,message:"All fields are required"})
        }
        const existingUser=await UserModel.findOne({email})     //checking weather user is in database or not
        if(existingUser){                                    //condition to check user already exist or not, if yes send error
            return res.status(303).json({sucess:false,message:"User already exist Please Login"})
        }

        const hasepassword=await bycript.hashSync(password,10)
        const NewUser=new UserModel({                        //if user doesnot exists
            userName,email,password:hasepassword
                                    //from body
        })
        await NewUser.save()                                        //for new user
        res.status(200).json({sucess:true,message:"User Register Sucessfully",User:NewUser})
    }catch(error){
        console.log(error)
        return res.status(303).json({sucess:false,message:"Internal Server Error"})

    }
}

//login function
const Login=async(req,res)=>{
    try{
        // res.send('hello from login')
        const {email,password}=req.body
        const FindUser=await UserModel.findOne({email})
        if(!FindUser){
            return res.status(404).json({sucess:false,message:"User not found Please Register"})

        }
        const comparePassword= await bycript.compare(password,FindUser.password)
        if(!comparePassword){
         return res.status(303).json({sucess:false,message:"invalid Password"})   
        }

        //creating token
        const token=await jwt.sign({userId:FindUser._id},process.env.SecreateKey,{expiresIn:"3days"})
        res.cookie("token",token,{
            httpOnly:true,
            secure:false,
            maxAge: 3 * 24* 3600* 1000
        })

        res.status(200).json({sucess:true,message:"Login Successfully",user:FindUser,
            token
        })
    
    }catch(error){
        console.log(error)
        return res.status(500).json({sucess:false,message:"Internal Server Error"}) 
    }
}


const Logout=async(req,res)=>{
    try{
        res.clearCookie('token')
        res.status(200).json({sucess:false,message:"Logout Sucessfully",})
    }
    catch(error){
        console.log(error)
        return res.status(500).json({sucess:false,message:"Internal Server Error"}) 
    }
}
export{Register,Login,Logout}