const appUsers = require('../models/user')

const addToVisited =async({id,data})=>{
    let success;
    try{
        const user = await appUsers.findOne({_id:id})
        if(user){
            const exist = user.visited.find((v)=>v.name===data.name)
            if(exist) success =true;
            else{
                try{
                    const added = await appUsers.updateOne(
                        {_id:id},
                        {
                            $push:{
                                visited:data
                            }
                        }
                    )
                    success =true
                }catch(err){
                    console.log(err)
                    success =false
                }
            }
        }
    }catch(err){
        console.log(err)
        success=false
    }
    return success
}

module.exports =addToVisited;