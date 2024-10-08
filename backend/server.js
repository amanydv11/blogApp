import express from 'express'
import mongoose from 'mongoose';
import dotenv from 'dotenv'
dotenv.config();
mongoose
.connect(
    process.env.MONGO_URI
)
.then(()=>{
    console.log('db connected')
});

const app = express()

app.get('/',(req,res)=>{
    res.send("hello")
});

app.listen(3000,()=>{
    console.log("server connected 3000")
});