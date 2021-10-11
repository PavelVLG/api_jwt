const express =require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.send(`<h1>user js</h1>`)
})

router.get('/auth', (req, res) => {
    res.send(`<h1>user auth</h1>`)
})



module.exports = router;