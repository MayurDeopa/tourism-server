const express = require('express')
const mongoose = require('mongoose')
const cors= require('cors')
const imageRouter = require('./routes/images')
const loginRouter = require('./routes/auth')
const app = express()


app.use(express.json())
app.use(cors({origin:"https://travelhome.vercel.app"}))

mongoose.connect(`mongodb+srv://${process.env.DB_ADMIN}:${process.env.DB_PASSWORD}@cluster0.b24rp.mongodb.net/${process.env.COLLECTION_NAME}?retryWrites=true&w=majority`,(err)=>{
    if(!err)console.log("Connected")
})


app.use('/images',imageRouter)
app.use('/auth',loginRouter)


app.listen(process.env.PORT,()=>{
    console.log("live")
})