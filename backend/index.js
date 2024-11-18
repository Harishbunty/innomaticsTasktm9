const express = require('express');
const connectDB = require('./config/db');
const todoRoute = require('./routes/todoRoute');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
// Middleware
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use('/todos', todoRoute);

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
