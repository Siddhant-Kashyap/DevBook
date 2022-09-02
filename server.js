const express = require ('express')
const app = express();

const PORT = process.env.PORT || 5000;


app.get('/',(req,res)=>{
    res.send("SErver is UP")
})

app.listen(PORT,()=>{
    console.log("APP is Running on the port "+ PORT);
})