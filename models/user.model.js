const { db } = require('../database')
const { hashPassword, comparePassword } = require('../bcrypt')
const { v4: uuidv4 } = require('uuid');

async function insertNewUser(newUser) {

    const usernameAlreadyExists = await db.users.findOne({username: newUser.username})
    if (usernameAlreadyExists) {
        throw new Error('409 Username already exists in database')
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
    const passwordMatch = await comparePassword(user.password, userInDb.password)
    if (!passwordMatch) {
        throw new Error('401 Wrong password')
    }
    return
}

async function findUser(username) {
    const userInDb = await db.users.findOne({ username })
    if (!userInDb) {
        throw new Error("404 Can not find user in database")
    }
    return userInDb
}

module.exports = { insertNewUser, findUser, login }
