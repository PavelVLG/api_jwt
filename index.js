const express = require('express');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors')
const cookieParser = require('cookie-parser');


require('dotenv/config')

const app = express();

const booksRoute = require('./routes/books');
const usersRoute = require('./routes/users');
app.use('/books', booksRoute);
app.use('/api', usersRoute);

app.get('/', (req, res) => {
    res.send(`<h1> Home page </h1>`)
})
const PORT = process.env.PORT || 3001;
const DB_CONNECT = process.env.DB_CONNECTION || 'mongodb://localhost:test';

app.use(express.json());
app.use(cookieParser());
app.use(cors());


const start = async () => {
    try {
        await mongoose.connect(DB_CONNECT, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        }, () => {
            console.log(`connect to mongoDB`)
        });
        app.listen(PORT, () => console.log(`run server on port ${PORT} `))
    } catch (err) {
        console.log(err)
    }
}

start();