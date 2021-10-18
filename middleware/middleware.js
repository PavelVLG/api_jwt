const jwt = require('jsonwebtoken')

module.exports = function (req, res, next) {
    if (req.method === 'OPTIONS') {
        next()
    }
    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(403).json({message: 'пользователь не авторизован'})

        }
        const decodeJwtAccess = jwt.verify(token, process.env.JWT_ACCESS_SECRET )
        req.user = decodeJwtAccess
        next()
    } catch (err) {
        console.log(err)
        return res.status(403).json({message: 'пользователь не авторизован'})
    }
}