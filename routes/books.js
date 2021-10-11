const express =require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`<h1>all books </h1>`)
})

router.get('/mam', (req, res) => {
    res.send(`<h1>my book</h1>`)
})



module.exports = router;