const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const MailService = require('./mail-service')
const tokenService = require('./token-service')
const UserDto = require('../dtos/user-dto')
class UsersService {
    async registration(email, password) {
        const candidate = await UserModel.findOne({email})
        if (candidate) {
            throw new Error(`Почта: ${email} была зарегистрирована ранее.`)
        }
        const hashPassword = await bcrypt.hash(password, 8)
        const activationLink = uuid.v4()
        const user = await UserModel.create({email, password: hashPassword})
        await MailService.activationMail(email, activationLink)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateToken({...userDto})
        await  tokenService.saveRefreshToken(userDto.id, tokens.refreshToken);

        return{
            ...tokens,
            user: userDto
        }

    }


};

module.exports = new UsersService();