import express from 'express'
import { Login, Register, Logout } from '../controllers/Auth.js'

// const AutRoutes= express.Router()
// AutRoutes.post('/register',(req,res)=>{
//     res.send('hello world')
// })

const AutRoutes = express.Router()
AutRoutes.post('/register', Register)  // basic route for authentication
AutRoutes.post('/login', Login)     // for login
AutRoutes.post('/logout', Logout)



export default AutRoutes