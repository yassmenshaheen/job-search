//impor modules
import path from 'path'
import express from 'express'
import dotenv from 'dotenv'
import { connectDB } from './db/connection.js'
import { initApp } from './src/initApp.js'
import { bootStrap } from './src/bootStrap.js'
//create server
const app = express()
const port = 3000
// connect to db
dotenv.config({path:path.resolve('./config/.env')})
connectDB()
bootStrap(app,express)
initApp(app , express)
//listen server
app.listen(port ,()=>{
    console.log('server is running on port ', port);
    
})