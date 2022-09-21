const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const routes = require('./routes');

// Import Routes
// const authRoute = require('./api/auth');
// const userList = require('./api/readData');

dotenv.config();

// Connect to DB
mongoose.connect(process.env.DB_CONNECT,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    },
);
// Check Connection
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected DB succaessfully");
});

// MiddleWare
app.use(express.json());
// Routes Middlewares
routes(app)

app.listen(3000, () => console.log('Server up and running'));
