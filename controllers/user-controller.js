const userServices = require('../services/users-service');


class UserController {
    async registration(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userServices.registration(email, password)
            res.cookies('refreshToken', userData.refreshToken, {maxAge: 42*24*60*60*100, httpOnly: true})
            return res.json(userData)
        } catch (err) {
            console.log(err, 'err controller')

        }
    }

    async login(req, res, next) {
        try {

        } catch (err) {

        }
    }

    async logout(req, res, next) {
        try {

        } catch (err) {

        }
    }

    async activate(req, res, next) {
        try {

        } catch (err) {

        }
    }

    async refresh(req, res, next) {
        try {

        } catch (err) {

        }
    }

    async getUsers(req, res, next) {
        try {
            res.json(['VScode', 'PHPstorm'])
        } catch (err) {

        }
    }
}

module.exports = new UserController();
