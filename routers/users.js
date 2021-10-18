const Router = require('express')
const router = new Router();
const controller = require('../controllers/authController')


router.post('/registration', controller.registrations )
router.post('/login', controller.login)
router.get('/', controller.getUsers)

module.exports = router;