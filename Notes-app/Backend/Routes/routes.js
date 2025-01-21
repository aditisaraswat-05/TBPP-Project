import express from 'express'
import {Register} from '../controllers/Auth.js'

// const AutRoutes= express.Router()
// AutRoutes.post('/register',(req,res)=>{
//     res.send('hello world')
// })

const AutRoutes= express.Router()
AutRoutes.post('/register',Register)  // basic route for authentication
    


export default AutRoutes