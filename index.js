import express from "express";
import config from "config";
import mongoose from "mongoose";

const app = express()
const PORT = config.get('port') || 8000;
const MONGOURL = config.get('mongoUrl');


app.get('/', (req,res)=>{
    res.send(`<h1>server started on port: ${PORT} </h1>`)
})


async function start(){
    try{
        await mongoose.connect(MONGOURL, {
            useNewUrlParser: true,
        })
        app.listen(PORT, ()=>{
            console.log(`server started on port: ${PORT}`)
        })
    }catch (e) {
        console.log(`server has error ${e.message}`)
        process.exit(1)
    }
}
start()