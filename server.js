require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose') //connects to database. Commented bc its here but its better to separate it in a different file.Will use later.
const connectDB = require('./config/connectDB')
const catRoutes = require('./routes/catRoutes')
const userRoutes = require('./routes/userRoutes')
const session = require('express-session')
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy
const User = require('./models/userModel')
const PORT = process.env.PORT || 3500
connectDB()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use(express.static('public')) //tells server which files to serve to the browser img,css,html

app.set('view engine', 'ejs')

app.use(session({
    secret: 'this is Catnbook',
    resave: false,
    saveUninitialized: false
}))

app.use(passport.initialize())
app.use(passport.session())

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.use((req, res, next) => {
    res.locals.currentUser = req.user
    next()
})

app.use('/', catRoutes)
app.use('/', userRoutes)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})//ensures mongodb connecton before connecting to server
