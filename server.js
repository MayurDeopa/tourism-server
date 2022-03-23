const express = require('express')
const mongoose = require('mongoose')
const cors= require('cors')
const imageRouter = require('./routes/images')
const loginRouter = require('./routes/auth')
const app = express()


app.use(express.json())
app.use(cors({origin:"*"}))

mongoose.connect('mongodb://localhost:27017/tourism',(err)=>{
    if(!err)console.log("Connected")
})


app.use('/images',imageRouter)
app.use('/auth',loginRouter)


app.listen('8000',()=>{
    console.log("live on port 8000")
})