const express = require('express')
const appUsers = require('../models/user')
const jwt = require('jsonwebtoken')

const router= express.Router()

router.post('/login',async(req,res)=>{
    const decoded = jwt.decode(req.body.token)
    try{
        const user = await appUsers.findOne({
            email:decoded.email
        })
        if(user){
            if(user.password===decoded.password){
                const enc = jwt.sign(JSON.stringify(user),'fagsagnasjkbga')
                res.send({
                    status:'ok',
                    user:enc
                })
            }
            else{
                res.send({
                    status:'failed',
                    message:'Wrong password'
                })
            }
            
        }
        else{
            res.send({
                status:'failed',
                message:'No user found'
            })
        }
    }catch(err){
        res.send({
            status:'failed',
            message:err.message
        })
    }
})

router.post('/register',async(req,res)=>{
    try{
        const user = await appUsers.findOne({
            email:req.body.email
        })
        if(user){
            res.send({
                status:'failed',
                message:'A user already exists with this email'
            })
        }
        else{
            try{
                const again = await appUsers.findOne({username:req.body.username})
                if(again){
                    res.send({
                        status:'failed',
                        message:'A user already exists with this username'
                    })
                }
                else{
                    const newUser = appUsers.create(req.body)
                    res.send({
                        status:'ok',
                        user:newUser
                    })
                }
            }catch(err){
                res.send({
                    status:'failed',
                    message:err.message
                })
            }
        }  
    }catch(err){
        res.send({
            status:'failed',
            message:err.message
        })
    }
})

module.exports = router;