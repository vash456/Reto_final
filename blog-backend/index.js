const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const requestLogger = require('./src/middlewares/requestLogger')
const postRouter = require('./src/routes/post')
const commentRouter = require('./src/routes/comment')
const userRouter = require('./src/routes/user')
const authRouter = require('./src/routes/auth')

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json())

//app.use(express.static('public'));

app.use(requestLogger);

app.use('/posts', postRouter)
app.use('/comments', commentRouter)
app.use('/users', userRouter)
app.use('/auth', authRouter)

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`)
});