const express = require("express");
const app = express();
const dotenv = require('dotenv');
const errorMiddleware = require("./middlewares/error.js")
const userRoute = require('./routes/userRoute.js')
const categoriesRoute = require('./routes/categoriesRoute.js')
const bodyParser = require('body-parser')
const morgan = require('morgan');
const cookieParser = require("cookie-parser");
const cors = require('cors')
const path = require('path');
const expenseRoute = require("./routes/expenseRoute.js");
const incomeRoute = require("./routes/incomeRoute.js");
const accountRoute = require("./routes/accountRoute.js");
dotenv.config()
app.use(cors());
app.use(express.json())
app.use(morgan("dev"))
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api/v1/user', userRoute);
app.use('/api/v1/category', categoriesRoute);
app.use('/api/v1/income', incomeRoute);
app.use('/api/v1/expense', expenseRoute);
app.use('/api/v1/account', accountRoute);

app.get('/', (req, res) => {
    res.send({
        message: "welcome to scaler application"
    })
});


app.use(errorMiddleware);

module.exports = app;
