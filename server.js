const express = require ('express')
const app = express();
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000;

//connect to DB

connectDB();


app.get('/',(req,res)=>{
    res.send("SErver is UP")
})

app.listen(PORT,()=>{
    console.log("APP is Running on the port "+ PORT);
})