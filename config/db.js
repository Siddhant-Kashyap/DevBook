const mongoose = require('mongoose');
const config = require('config')

const db = config.get('mongoURI');


const connectDB =async () =>{
    try {
        await mongoose.connect(db);

        console.log("MongoDB is connected")
    } catch (error) {
        console.log(error)
        //exit
        process.exit(1)
    }



}

module.exports = connectDB;