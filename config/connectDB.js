const mongoose = require('mongoose')

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URI)

    } catch (error) {
        console.log(error)

    }//use try catch in anything that can fail. Servers can fail.
}//async function sends request and awaits response, this function waits the time before taking action.
module.exports = connectDB