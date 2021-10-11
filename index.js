const express = require('express');
const mongoose = require("mongoose");
require('dotenv/config')


const app = express();

const PORT = process.env.PORT || 3001;
const DB_CONNECT = process.env.DB_CONNECTION || 'mongodb://localhost:test';

app.get('/', (req, res) => {
    res.send(`<h1>Test page1</h1>`)
})
app.get('/page', (req, res) => {
    res.send(`<h1>Test page2</h1>`)
})

mongoose.connect(DB_CONNECT, {
    useNewUrlParser: true

    }, () => {
        console.log('connect to mongoDB')
    });

app.listen(PORT)
