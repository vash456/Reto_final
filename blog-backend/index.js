const express = require('express')
const app = express()
const port = 3000
const requestLogger = require('./src/middlewares/requestLogger')
const postRouter = require('./src/routes/post')

app.use(express.json())

//app.use(express.static('public'));

app.use(requestLogger);

app.use('/posts', postRouter)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});