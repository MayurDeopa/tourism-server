const express = require('express')
const addToVisited = require('../lib/addToVisited')
const getRandomImage = require('../lib/getRandomImage')
const appImages = require('../models/images')
const appUsers = require('../models/user')

const router= express.Router()

router.get('/',async(req,res)=>{
    const {tag,id} = req.query
    if(tag){
        try{
            const image = await appImages.find({
                tags:{$all:[tag]}
            })
            if(image.length!==0){
                const random = getRandomImage(image)
                try{
                    const success = await addToVisited({id:id,data:random})
                    if(success){
                        res.send({
                            status:'ok',
                            image:[random]
                        })
                    }
                    else{
                        res.send({
                            status:'failed',
                            message:"Something went wrong"
                        })
                    }
                }catch(err){
                    res.send({
                        status:'failed',
                        message:err.message
                    })
                }
            }
            else{
                res.send({
                    status:'failed',
                    image:[],
                    message:"No image found with such tag"
                })
            }
        }catch(err){
            res.send({
                status:'failed',
                message:err.message
            })
        }
    }
    else{
        try{
            const image = await appImages.aggregate(
                [{$sample:{size:1}}]
            )
            try{
                const success = await addToVisited({id:id,data:image[0]})
                if(success){
                    res.send({
                        status:'ok',
                        image:image
                    })
                }
                else{
                    res.send({
                        status:'failed',
                        message:"Something went wrong"
                    })
                }
            }catch(err){
                res.send({
                    status:'failed',
                    message:err.message
                })
            }
        }catch(err){
            res.send({
                status:'failed',
                message:err.message
            })
        }
    }
   
})

router.get('/wishlist',async(req,res)=>{
    const {id} = req.query
    if(id){
        try{
            const wishlist = await appUsers.findOne({_id:id})
            res.send({
                status:'ok',
                wishlist:wishlist.wishlist
            })
        }catch(err){
            res.send({
                status:'failed',
                message:err.message
            })
        }
    }
    else{
        res.send({
            status:'failed',
            message:'Something went wrong'
        })
    }
})

router.post('/wishlist/add',async(req,res)=>{
    const {id} = req.query
    const image = req.body
    try{
        const user = await appUsers.findOne({_id:id})
        if(user) {
            const exist = user.wishlist.find((w)=>w.name===image.name)
            if(exist) res.send({
                status:'ok',
                user:user
            })
            else{
                try{
                    const newWishList = await appUsers.updateOne(
                        {_id:id},
                        {
                            $push:{
                                wishlist:image
                            }
                        }
                    )
                    res.send({
                        status:'ok',
                        data:newWishList
                    })
                }catch(err){
                    res.send({
                        status:'failed',
                        message:err.message
                    })
                }
            }
        }
        else res.send({
            status:'failed',
            message:"Authentication failed"
        })
    }catch(err){
        res.send({
            status:'failed',
            message:err.message
        })
    }
})

router.get('/visited',async(req,res)=>{
    const {id} = req.query
    try{
        const visited = await appUsers.findOne({_id:id})
        if(visited.visited.length){
            res.send({
                status:'ok',
                visited:visited.visited
            })
        }
        else{
            res.send({
                status:'failed',
                message:"You havent vivited any place yet"
            })
        }
    }catch(err){
        res.send({
            status:'failed',
            message:err.message
        })
    }
})

module.exports = router;