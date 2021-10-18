const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt')
const {log} = require("nodemon/lib/utils");
const {validationResult} = require('express-validator')
const jwt = require('jsonwebtoken')

const generationAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {expiresIn: "48h"})
}

class AuthController {
    async registrations(req, res) {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({message: "Ошибка на клиенте", errors})
            }
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
        } catch (err) {
            console.log(err)
            res.status(400).json({message: 'Registration error'})
        }
    }

    async login(req, res) {
        try {
            const {username, password} = await req.body;
            const user = await User.findOne({username})
            if (!user) {
                return res.status(400).json({message: `пользователь ${user} не найден`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: 'пароль не действителен'})
            }
            const tokenJwt = generationAccessToken(user._id, user.roles)
            return res.json({
                token: tokenJwt
            })
        } catch (err) {
            res.status(400).json({message: 'login error'})
        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)
        } catch (err) {
            res.status(400).json({message: 'getUser error'})
        }
    }
}

module.exports = new AuthController();