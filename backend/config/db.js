const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://polatipraneeth:6QG0PUSZ1m4yGf0R@cluster0.o3crb.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', {
        });
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('Database connection failed', err);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
