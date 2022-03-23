const mongoose  = require('mongoose')

const users = new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        require:true
    },
    visited:[
        {
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
        }
    ],
    wishlist:[
        {
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
        }
    ]
})

mongoose.models ={}

const appUsers = mongoose.model.users || mongoose.model('users',users)

module.exports = appUsers;

