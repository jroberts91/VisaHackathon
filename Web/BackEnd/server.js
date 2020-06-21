const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");

require('dotenv').config();

//Connect MongoDB
const mongoose = require("mongoose");
const connect = mongoose.connect(process.env.MONGO_SECRET,
  {
    useNewUrlParser: true, useUnifiedTopology: true,
    useCreateIndex: true, useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));


app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//api
app.use('/api/merchant', require('./routes/merchant'));
app.use('/api/product', require('./routes/product'));

//to retrieve images
app.use('/uploads', express.static('uploads'));


const port = process.env.PORT;

app.listen(port, (error) => {
  if (error) {
    console.log(`Error ${error} has occurred when starting the server.`);
  }
  console.log(`Server running on ${port}`);
});
