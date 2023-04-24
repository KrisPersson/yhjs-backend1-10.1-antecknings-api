const bcrypt = require('bcrypt')

function hashPassword(password) {
    return bcrypt.hash(password, 10)
}

function comparePassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword)
}

module.exports = { hashPassword, comparePassword }
