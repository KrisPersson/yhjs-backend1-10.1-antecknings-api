const { db } = require('../database')
const { hashPassword, comparePassword } = require('../bcrypt')
const { v4: uuidv4 } = require('uuid');

async function insertNewUser(newUser) {

    const usernameAlreadyExists = await findUser(newUser.username)
    if (usernameAlreadyExists) {
        throw new Error('Username already exists in database')
    }

    let finalObject = { 
        id: uuidv4(),
        username: newUser.username,
        password: await hashPassword(newUser.password),
        signedUpAt: new Date()
    }

    return await db.users.insert(finalObject)
}

async function login(user) {
    const userInDb = await findUser(user.username)
    if (!userInDb) {
        throw new Error('Username does not exist in database')
    }
    const passwordMatch = await comparePassword(user.password, userInDb.password)
    if (!passwordMatch) {
        throw new Error('Wrong password')
    }
    return
}

async function findUser(username) {
    return await db.users.findOne({ username })
}

module.exports = { insertNewUser, findUser, login }
