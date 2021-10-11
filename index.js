const express = require('express');
const mongoose = require("mongoose");
require('dotenv/config')


const app = express();

const booksRoute = require('./routes/books')
const usersRoute = require('./routes/users')

app.use('/api/users', usersRoute)
app.use('/api/books', booksRoute)

app.get('/', (req,res) =>{
    res.send(`<h1> Home page </h1>`)
})
const PORT = process.env.PORT || 3001;
const DB_CONNECT = process.env.DB_CONNECTION || 'mongodb://localhost:test';

mongoose.connect(DB_CONNECT, {
    useNewUrlParser: true

    }, () => {
        console.log(`connect to mongoD, on port: ${PORT}`)
    });

app.listen(PORT)
