const Router = require('express')
const router = new Router();
const controller = require('../controllers/authController')
const {check} = require('express-validator')

router.post('/registration', [
    check('username', 'поле не может быть пустым').notEmpty(),
    check('password', 'пароль должен быть более 4 и менее 14 символов ').isLength({min: 4, max: 10})
    ],
    controller.registrations )
router.post('/login', controller.login)
router.get('/', controller.getUsers)

module.exports = router;