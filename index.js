const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
const cookieParser = require('cookie-parser');
const authUser = require('./routers/users')
require('dotenv/config')
const PORT = process.env.PORT || 8000;
const DB_CONNECT = process.env.DB_CONNECTION_REMOTE;


const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors());

app.use('/api', authUser)


const start = async () => {
    try {
        await mongoose.connect(DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => {
            console.log(`connected to mongoDB`)
        });
        app.listen(PORT, () => console.log(`run server on port ${PORT} `))
    } catch (err) {
        console.log(err)
    }
}

start();