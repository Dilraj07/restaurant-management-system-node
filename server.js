const express = require('express');
const app = express();
const cors = require("cors");
const morgan = require('morgan');
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const connectDb = require('./config/db');


//env configuration
dotenv.config()// if .env is in someother folder use config({path:'./folder'})

//database connection
connectDb();

//Middleware
app.use(cors());
app.use(express.json());//access user data in json format
app.use(bodyParser.json())
app.use(morgan('dev'));

//routes
app.use('/api/v1/test', require('./routes/testRoutes'));
app.use('/api/v1/auth', require('./routes/authRoutes'));
app.use('/api/v1/user', require('./routes/userRoutes'));
app.use('/api/v1/restaurant', require('./routes/restaurantRoutes'));
app.use('/api/v1/category', require('./routes/categoryRoutes'));
app.use('/api/v1/food', require('./routes/foodRoutes'));

app.get('/', (req, res) => {
  return res.status(200).send("<h1>Welcome to Food Server</h1>");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`App listening on PORT ${PORT}`);
})