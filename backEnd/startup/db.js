
require('dotenv').config();
const mongoose = require('mongoose')


const {MONGO_URI} = process.env;


const connectDB = async () => {
    try {
    const conn = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch (err) {
        console.error(err)
        process.exit(1)
    }
}

module.exports = connectDB