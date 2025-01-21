import express from 'express'
import dotenv from 'dotenv'
import AutRoutes from './routes/Auth.js'
import DbCon from './utlis/db.js'



dotenv.config()

//mongodb connection
DbCon()
const PORT= process.env.PORT
const app=express()


app.use(express.json())


app.use('/auth',AutRoutes)

app.get('/',(req,res)=>{
    res.send('hello world')
})

app.listen(PORT,()=>{
    console.log(`App is running on port ${PORT}`);

})