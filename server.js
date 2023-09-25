require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose') //connects to database. Commented bc its here but its better to separate it in a different file.Will use later.
const connectDB = require('./config/connectDB')
const catRoutes = require('./routes/catRoutes')
const PORT = process.env.PORT || 3500

connectDB()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use(express.static('public')) //tells server which files to serve to the browser img,css,html

app.set('view engine', 'ejs')

app.use('/', catRoutes)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})//ensures mongodb connecton before connecting to server
