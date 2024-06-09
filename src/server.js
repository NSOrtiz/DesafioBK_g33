const express = require('express');
const usersRouter = require('./routes/user.router');
const postRouter = require('./routes/postPublish.router');
const authRouter = require('./routes/auth.router');

const app = express();

app.use(express.json());
app.use('/users', usersRouter);
app.use('/posts', postRouter);
app.use('/auth', authRouter);

app.get('/', (req, res)=>{
    res.json({
        message: "post-API"
    });
});

module.exports = app; 