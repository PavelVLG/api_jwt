const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt')

class AuthController {
    async registrations(req, res) {
        try {
            const {userName, password} = req.body;
            const candidate = await User.findOne({userName})
            if (candidate){
                return res.status(400).json( {message: 'Это имя занято'})
            }
            const hashPassword = bcrypt.hashSync(password, 6)
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({userName , password: hashPassword, roles:[userRole.value]})
            await user.save()
            return res.json({message: 'Успешная регистрация'})
        } catch (err) {
            res.status(400).json({message: 'registrations error'})
        }
    }

    async login(req, res) {
        try {

        } catch (err) {
            res.status(400).json({message: 'login error'})
        }
    }

    async getUsers(req, res) {
        try {
            res.json('Your have this message because your connect with server api')
        } catch (err) {
            res.status(400).json({message: 'getUser error'})
        }
    }
}

module.exports = new AuthController();