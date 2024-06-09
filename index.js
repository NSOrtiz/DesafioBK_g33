require("dotenv").config();

const server = require('./src/server');

const db = require('./src/lib/db');

const PORT = process.env.PORT || 8080;

db.connect().then(()=>{
    server.listen(PORT, ()=>{
        console.log('server is running...')
    })
}).catch((error)=>{
    console.error('DB connection error: ', error)
})