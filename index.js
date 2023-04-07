// required packages
require('dotenv').config()
const express = require('express')
const cookieParser = require('cookie-parser')
const cryptoJs = require('crypto-js')
const db = require('./models')

// app config
const app = express()
const PORT = process.env.PORT || 8000
app.set('view engine', 'ejs')

// middlewares
// parse html from request bodies
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use((req, res, next) => {
    // incoming request console logger
    console.log(`[${new Date().toLocaleString()}]: ${req.method} ${req.url}`)
    console.log('request body:', req.body)
    // send data downstream to the other routes
    res.locals.myData = "hi"
    next() // tells express that this middleware has finished
})
// custom auth middleware 
app.use( async (req, res, next) => {
    try{
        // check if there is a cokkie 
        if (req.cookies.userId) {

            //if so we will decrypt the cookie and lookeup the user using their PK
            const decryptedPk = cryptoJs.AES.decrypt(req.cookies.usedId, process.env.ENC_KEY)
            const decryptedPkString = decryptedPk.toString(cryptoJs.enc.Utf8)
            const user = await db.user.findByPk(decryptedPkString)
            // mount the found user on the res.locals
            // in all other routes you can assume that the res.locals.user is the currantly logged in user
            res.locals.user = user
        } else {
            //if there is no cokkie, set res.local to be null
            res.locals.user = null
        }
    }catch(error) {
        console.log(error)
        //if something goes wrong
        //set the user in the res.locals to be null
        res.locals.user = null
    } finally {
        // runs regardless of whether there was an error or not
        next() // goes to the next thing no matter what
    }
})


// routes and controllers
app.get('/', (req, res) => {
    console.log(res.locals)
    res.render("index.ejs" , {
        user: res.locals.user
    })
})

app.use('/users', require('./controllers/users.js'))

// listen a port
app.listen(PORT, () => {
    console.log(`authenticating users on port ${PORT}`)
})