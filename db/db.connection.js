const mongoose=require('mongoose')
require('dotenv').config()
const MONGOUri=process.env.MONGODB
const initializerDatabase=async()=>{
    await mongoose.connect(MONGOUri).then(()=>{
        console.log("Connected to the Database")
    }).catch(error=>console.log("Error while connected to the database.",error))
}
module.exports={initializerDatabase}
