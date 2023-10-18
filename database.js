const mongoose = require("mongoose");
const url = require('./value.json')


exports.connectMongoose = () =>{
    mongoose
    .connect(url.MONGO_URL)
    .then((e)=> console.log(`connecetd : ${e.connection.host}`))
    .catch((e)=> console.log(e));
};


const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required : true,
        unique : true
    },
    name :{
        type:String,
        required:true
    },
    password :{
        type: String,
        required:true
    }
});


exports.User = mongoose.model("User", userSchema);