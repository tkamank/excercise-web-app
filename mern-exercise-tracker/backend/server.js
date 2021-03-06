const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

//Configures dotenv to allow env var in .env files.
require('dotenv').config();

//ES6, use require to import dependencies

//Creates Express server, defines port at const
const app = express();
const port = process.env.PORT || 5000;
//Establish connection with mongoDB database
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true});

//Define and establish if connection is open, if so, print
const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
})


//Adds Middleware & allows Express to parse JSON.
app.use(cors());
app.use(express.json());

//Referencing routes 
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

//Defining endpoints ()
app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

//Start server (*), listens to port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})