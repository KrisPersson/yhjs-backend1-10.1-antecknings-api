const express = require('express')
const app = express()
const PORT = process.env.PORT || 8000

app.use(express.json())

const { userRouter } = require('./routes/user.route')
const { notesRouter } = require('./routes/notes.route')

const swaggerUI = require('swagger-ui-express')
const apiDocs = require('./docs/docs.json')
app.use('/api/docs', swaggerUI.serve)
app.get('/api/docs', swaggerUI.setup(apiDocs))


app.use('/api/notes', notesRouter)
app.use('/api/user', userRouter)


app.listen(PORT, () => {
    console.log('Started server at port ' + PORT)
})

