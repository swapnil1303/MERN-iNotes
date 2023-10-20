const mongoose=require('mongoose');
const mongoURI="https://www.whatsapp.com/channel/0029Va6SE2X4inogoG4U053h";
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected successfully to the Database");
    })
}
module.exports=connectToMongo;