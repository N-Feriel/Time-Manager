require('express-async-errors');
const logger = require('./config/winston');
const winston = require('winston')
require('winston-mongodb');
const express = require('express');
const app = express();

const morgan = require('morgan');
const connectDB = require('./startup/db')
const types = require('./routes/types')
const users = require("./routes/users")
const auth = require("./routes/auth");
const events = require('./routes/events');
const error = require("./middleware/error");


app.use(express.json());
// app.use(morgan('combined', { stream: logger.stream }));

//Use mongoose to connect to DataBase
connectDB()

// winston.add(new winston.transports.File({ filename: 'logfile.log' }));
// winston.add(new winston.transports.MongoDB({db:`${MONGO_URI}` }));

// winston.exceptions.handle(
//     new winston.transports.File({ filename: 'exceptions.log' })
// );

// process.on('unhandledRejection', (ex)=>{
//     throw ex
// })

app.use('/api/types', types)
app.use('/api/users', users)
app.use('/api/auth', auth)
app.use('/api/event', events)

app.use(error)

const port = process.env.PORT || 3000

app.listen(port, ()=> console.log(`listening on port ${port}...`))