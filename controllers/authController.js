const User = require('../models/User')
const Role = require('../models/Role')
const bcrypt = require('bcrypt')
const {log} = require("nodemon/lib/utils");
const {validationResult} = require('express-validator')
const tokenService = require('../service/createToken')
const UserDto = require('../dtos/user-dto')

class AuthController {
    async registrations(req, res) {
        try {
            console.log(req.body)
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
                const hashPassword = await bcrypt.hashSync(password, 6);
                const userRole = await Role.findOne({value: "USER"})
                const user = new User({username, password: hashPassword, roles: [userRole.value]})
                const userDto = await new UserDto(user)
                await user.save()
                const tokens =  tokenService.genereteToken({...userDto})

                /***???***/

                await tokenService.saveToken(userDto.id, tokens.refreshToken)
                return res.status(200).json({
                    tokens,
                    user: userDto,
                })

            }
        } catch (err) {
            console.log(err)
            res.status(400).json({message: 'Registration error'})
        }
    }
/************************************************************/
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
            return res.json({
                token: 'tokenJwt'
            })
        } catch (err) {
            res.status(400).json({message: 'login error'})
        }
    }
/**************************************************************************/
    async refresh(req, res) {
        try {

        } catch (err) {
            console.log(err)
        }
    }
/********************************************************************************/
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