const mongoose = require('mongoose')

const images = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    url:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tags:[
        {
            type:String
        }
    ]
})

mongoose.models ={}

const appImages = mongoose.model.images || mongoose.model('images',images)

module.exports =appImages;