const mongoose = require("mongoose");
const url = require('./value.json')
exports.connectMongoose = () =>{
    mongoose
    .connect(url.MONGO_URL)
    .then((e)=> console.log(`connecetd : ${e.connection.host}`))
    .catch((e)=> console.log(e));
};
module.exports = { connectMongoose };