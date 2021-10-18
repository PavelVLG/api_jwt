const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt')
const {log} = require("nodemon/lib/utils");

class AuthController {
    async registrations(req, res) {
        try {
            const {username, password} = await req.body;
            const candidate = await User.findOne({username})
            console.log("candidate:", candidate)
            if (candidate != null) {
                if (candidate.username === username) {
                    return res.status(400).json({message: `Пользователь с  именем ${username} уже существует`})
                }
            } else {
                const hashPassword = await bcrypt.hashSync(password, 7);
                const userRole = await Role.findOne({value: "USER"})
                const user = new User({username, password: hashPassword, roles: [userRole.value]})
                await user.save()
                return await res.json({message: "Пользователь успешно зарегистрирован"})
            }
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
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