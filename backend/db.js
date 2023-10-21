const mongoose=require('mongoose');
const mongoURI="mongodb://127.0.0.1:27017/inotes?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.9.0"
const connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Connected successfully to the Database");
    })
}
module.exports=connectToMongo;