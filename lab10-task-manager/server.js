const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/taskdb')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Routes
const userRoutes = require('./routes/user');
const taskRoutes = require('./routes/task');

app.use(userRoutes);
app.use(taskRoutes);

// Server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
const productRoutes = require('./routes/product');
app.use(productRoutes);