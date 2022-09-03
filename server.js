const express = require ('express')
const app = express();
const connectDB = require('./config/db')

const PORT = process.env.PORT || 5000;

//connect to DB

connectDB();


//Init middleWare
app.use(express.json({extended:false}))




app.use('/api/users',require('./routes/api/users'))
app.use('/api/profile',require('./routes/api/profile'))
app.use('/api/posts',require('./routes/api/posts'))
app.use('/api/auth',require('./routes/api/auth'))
app.get('/',(req,res)=>{
    res.send("SErver is UP")
})

app.listen(PORT,()=>{
    console.log("APP is Running on the port "+ PORT);
})