const nedb = require('nedb-promises')

const db = {
    users: new nedb({ filename: 'usersdb.db', autoload: true }),
    notes: new nedb({ filename: 'notesdb.db', autoload: true })
}

module.exports = { db }
